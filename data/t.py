import json
import re
from datetime import datetime

# 입력 JSON 파일명 (예: aladin_data.json)
INPUT_FILE = "aladin_data.json"
OUTPUT_FILE = "insert_books.sql"


def clean_text(text):
    """SQL용 안전한 문자열로 변환"""
    if text is None:
        return ''
    text = text.replace("'", "''")
    text = text.replace("&amp;", "&")
    return text.strip()


def parse_authors(author_field):
    """
    알라딘 author 필드 예시:
    '헤르모드 (지은이), 와삭바삭 (그림), 최재호 (옮긴이)'
    → 저자: ['헤르모드', '와삭바삭']
      번역가: ['최재호']
    """
    authors, translators = [], []
    if not author_field:
        return authors, translators

    parts = [a.strip() for a in author_field.split(',')]
    for part in parts:
        if '(옮긴이' in part:
            translators.append(part.split('(')[0].strip())
        elif any(k in part for k in ['(지은이', '(글', '(그림', '(각색']):
            authors.append(part.split('(')[0].strip())
    return authors, translators


def parse_category(category_field):
    """
    '국내도서>만화>인터넷 연재 만화' → ('국내도서', '만화')
    """
    if not category_field:
        return '기타', None
    parts = category_field.split('>')
    if len(parts) >= 2:
        return parts[0].strip(), parts[1].strip()
    elif len(parts) == 1:
        return parts[0].strip(), None
    else:
        return '기타', None


def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    sql_statements = []
    category_set = set()
    subcategory_set = set()
    author_set = set()
    translator_set = set()

    for item in data:
        title = clean_text(item.get("title"))
        price = item.get("priceSales", 0) or "NULL"
        point = item.get("mileage", 0) or "NULL"
        pub_date = item.get("pubDate", "")
        description = clean_text(item.get("description", ""))
        image_url = clean_text(item.get("cover", ""))
        category_name, subcategory_name = parse_category(item.get("categoryName", ""))

        # ===== CATEGORY =====
        if category_name not in category_set:
            sql_statements.append(
                f"INSERT INTO category (category_name) VALUES ('{category_name}');"
            )
            category_set.add(category_name)

        # ===== SUBCATEGORY =====
        if subcategory_name and (category_name, subcategory_name) not in subcategory_set:
            sql_statements.append(
                f"INSERT INTO subcategory (category_id, subcategory_name) "
                f"SELECT category_id, '{subcategory_name}' FROM category WHERE category_name = '{category_name}';"
            )
            subcategory_set.add((category_name, subcategory_name))

        # ===== AUTHOR / TRANSLATOR =====
        authors, translators = parse_authors(item.get("author", ""))

        for name in authors:
            if name not in author_set:
                sql_statements.append(
                    f"INSERT INTO author (name) VALUES ('{clean_text(name)}');"
                )
                author_set.add(name)

        for name in translators:
            if name not in translator_set:
                sql_statements.append(
                    f"INSERT INTO translator (name) VALUES ('{clean_text(name)}');"
                )
                translator_set.add(name)

        # ===== BOOK =====
        if re.match(r"^\d{4}-\d{2}-\d{2}$", pub_date):
            pub_date_sql = f"'{pub_date}'"
        else:
            pub_date_sql = "NULL"

        sql_statements.append(
            f"INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) "
            f"SELECT '{title}', s.subcategory_id, {price}, {point}, {pub_date_sql}, '{description}', '{image_url}' "
            f"FROM subcategory s "
            f"JOIN category c ON s.category_id = c.category_id "
            f"WHERE c.category_name = '{category_name}' "
            f"{'AND s.subcategory_name = ' + repr(subcategory_name) if subcategory_name else ''} "
            f"LIMIT 1;"
        )

        # ===== BOOK_AUTHOR (저자 연결) =====
        for name in authors:
            sql_statements.append(
                f"INSERT INTO book_author (book_id, author_id) "
                f"SELECT b.book_id, a.author_id FROM book b "
                f"JOIN author a ON a.name = '{clean_text(name)}' "
                f"WHERE b.title = '{title}' LIMIT 1;"
            )

        # ===== BOOK_TRANSLATOR (번역가 연결) =====
        for name in translators:
            sql_statements.append(
                f"INSERT INTO book_translator (book_id, translator_id) "
                f"SELECT b.book_id, t.translator_id FROM book b "
                f"JOIN translator t ON t.name = '{clean_text(name)}' "
                f"WHERE b.title = '{title}' LIMIT 1;"
            )

    # ===== OUTPUT =====
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("-- 자동 생성된 알라딘 → MySQL 변환 SQL (AUTO_INCREMENT 기반)\n")
        f.write("-- 생성일: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n\n")
        for stmt in sql_statements:
            f.write(stmt + "\n")

    print(f"✅ SQL 파일 생성 완료: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
