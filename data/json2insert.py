import json
from collections import defaultdict
import math

INPUT_FILE = "aladin_data.json"
OUTPUT_PREFIX = "insert_data_part"   # 예: insert_data_part1.sql, part2.sql ...

# 매핑 저장소
publisher_map = {}
author_map = {}
translator_map = {}
category_map = {}
subcategory_map = {}
book_map = {}

# Auto-increment 시뮬레이션
publisher_id = 1
author_id = 1
translator_id = 1
category_id = 1
subcategory_id = 1
book_id = 1

def escape(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

sql = []
sql.append("-- Auto-generated SQL with filtering\n\n")

for item in data:

    title = item.get("title")
    price = item.get("priceSales") or "NULL"
    point = item.get("mileage") or "NULL"
    pub_date = item.get("pubDate")
    image_url = item.get("cover")
    description = item.get("description") or ""
    publisher = item.get("publisher")
    category_name = item.get("categoryName")

    # -----------------------------------------------------------
    # 1) 출판사 중복 제거
    # -----------------------------------------------------------
    if publisher not in publisher_map:
        publisher_map[publisher] = publisher_id
        sql.append(
            f"INSERT INTO publisher (publisher_id, name) "
            f"VALUES ({publisher_id}, {escape(publisher)});"
        )
        publisher_id += 1

    publisher_fk = publisher_map[publisher]

    # -----------------------------------------------------------
    # 2) 카테고리 / 서브카테고리 중복 제거 (2-depth)
    # -----------------------------------------------------------
    cat_parts = category_name.split(">")
    main_cat = cat_parts[0].strip()
    sub_cat = cat_parts[1].strip() if len(cat_parts) > 1 else main_cat

    if main_cat not in category_map:
        category_map[main_cat] = category_id
        sql.append(
            f"INSERT INTO category (category_id, category_name) "
            f"VALUES ({category_id}, {escape(main_cat)});"
        )
        category_id += 1

    if sub_cat not in subcategory_map:
        parent_fk = category_map[main_cat]
        subcategory_map[sub_cat] = subcategory_id
        sql.append(
            f"INSERT INTO subcategory (subcategory_id, category_id, subcategory_name) "
            f"VALUES ({subcategory_id}, {parent_fk}, {escape(sub_cat)});"
        )
        subcategory_id += 1

    sub_fk = subcategory_map[sub_cat]

    # -----------------------------------------------------------
    # 3) 책(book) 중복 제거
    # -----------------------------------------------------------
    book_key = (title, publisher, pub_date)

    if book_key in book_map:
        current_book_id = book_map[book_key]
        continue

    book_map[book_key] = book_id
    current_book_id = book_id

    sql.append(
        f"INSERT INTO book (book_id, title, subcategory_id, publisher_id, price, point, "
        f"published_date, description, image_url) VALUES ("
        f"{book_id}, {escape(title)}, {sub_fk}, {publisher_fk}, {price}, {point}, "
        f"{escape(pub_date)}, {escape(description)}, {escape(image_url)});"
    )
    book_id += 1

    # -----------------------------------------------------------
    # 4) 저자 / 번역가 중복 제거
    # -----------------------------------------------------------
    raw_authors = item.get("author", "")
    authors_split = [x.strip() for x in raw_authors.split(",")]

    book_authors = []
    book_trans = []

    for name in authors_split:
        if not name:
            continue

        # 번역가
        if "옮긴이" in name:
            clean = name.replace("(옮긴이)", "").replace("옮긴이", "").strip()

            if clean not in translator_map:
                translator_map[clean] = translator_id
                sql.append(
                    f"INSERT INTO translator (translator_id, name) "
                    f"VALUES ({translator_id}, {escape(clean)});"
                )
                translator_id += 1

            book_trans.append(translator_map[clean])

        else:
            clean = name.replace("(지은이)", "").strip()

            if clean not in author_map:
                author_map[clean] = author_id
                sql.append(
                    f"INSERT INTO author (author_id, name) "
                    f"VALUES ({author_id}, {escape(clean)});"
                )
                author_id += 1

            book_authors.append(author_map[clean])

    # -----------------------------------------------------------
    # 5) 매핑 테이블
    # -----------------------------------------------------------
    for aid in book_authors:
        sql.append(
            f"INSERT INTO book_author (book_id, author_id) "
            f"VALUES ({current_book_id}, {aid});"
        )

    for tid in book_trans:
        sql.append(
            f"INSERT INTO book_translator (book_id, translator_id) "
            f"VALUES ({current_book_id}, {tid});"
        )

# -----------------------------------------------------------
# 6) SQL 파일을 1000줄 단위로 분할 저장
# -----------------------------------------------------------
chunk_size = 1000
total = len(sql)
file_count = math.ceil(total / chunk_size)

for i in range(file_count):
    start = i * chunk_size
    end = start + chunk_size
    part_sql = sql[start:end]

    filename = f"{OUTPUT_PREFIX}{i+1}.sql"
    with open(filename, "w", encoding="utf-8") as f:
        f.write("\n".join(part_sql))

print("====================================")
print("📊 데이터 통계 결과")
print("====================================")
print(f"📚 총 도서 수: {len(book_map)}")
print(f"🏢 출판사 수: {len(publisher_map)}")
print(f"✍ 저자 수: {len(author_map)}")
print(f"🔤 번역가 수: {len(translator_map)}")
print(f"📂 생성된 SQL 파일 수: {file_count}")
print("====================================")
print(f"✔ 파일 prefix: {OUTPUT_PREFIX}*.sql")
