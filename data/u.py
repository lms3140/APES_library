from datetime import datetime

INPUT_FILE = "insert_books.sql"       # 원본 SQL 파일
OUTPUT_FILE = "insert_books_dedup.sql"  # 중복 제거 후 파일

def normalize_sql(line: str) -> str:
    """
    INSERT 문을 비교하기 위한 정규화:
    - 공백 제거
    - 세미콜론 위치 통일
    - 대소문자 무시
    """
    line = line.strip().rstrip(";")
    return " ".join(line.split()).lower()

def main():
    seen = set()
    unique_lines = []

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if not stripped or stripped.startswith("--"):  # 주석/빈줄 무시
                unique_lines.append(line)
                continue

            normalized = normalize_sql(stripped)
            if normalized not in seen:
                seen.add(normalized)
                unique_lines.append(line)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(f"-- 중복 제거된 SQL 파일\n-- 생성일: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.writelines(unique_lines)

    print(f"✅ 중복 제거 완료: {OUTPUT_FILE}")
    print(f"총 {len(seen)}개의 고유 쿼리로 정리되었습니다.")

if __name__ == "__main__":
    main()
