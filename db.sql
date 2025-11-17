drop database book_store;
create database book_store;
use book_store;

-- SHOW tables;
-- desc member;
-- select * from member;
select * from book;


-- ============================================================
-- 📚 카테고리 / 하위 카테고리
-- ============================================================

CREATE TABLE category (
  category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE subcategory (
  subcategory_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT NOT NULL,
  subcategory_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category (category_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- ✍️ 저자 / 번역가 (시간필드 없음)
-- ============================================================

CREATE TABLE author (
  author_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE translator (
  translator_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bio TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 📖 도서
-- ============================================================

CREATE TABLE book (
  book_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subcategory_id BIGINT NULL,
  price INT NULL,
  point INT NULL,
  published_date DATE NULL,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (subcategory_id) REFERENCES subcategory (subcategory_id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 📚 책 - 저자 / 번역가 매핑 (변경 없음)
-- ============================================================

CREATE TABLE book_author (
  book_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  PRIMARY KEY (book_id, author_id),
  FOREIGN KEY (book_id) REFERENCES book (book_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (author_id) REFERENCES author (author_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE book_translator (
  book_id BIGINT NOT NULL,
  translator_id BIGINT NOT NULL,
  PRIMARY KEY (book_id, translator_id),
  FOREIGN KEY (book_id) REFERENCES book (book_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (translator_id) REFERENCES translator (translator_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 👤 회원 / 주소
-- ============================================================

CREATE TABLE member (
  member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  birth DATE NULL,
  gender VARCHAR(1) NULL,
  role VARCHAR(20) NULL,
  point_balance INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE address (
  address_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  member_id BIGINT NOT NULL,
  recipient_name VARCHAR(50) NULL,
  phone VARCHAR(20) NULL,
  address_line1 VARCHAR(255) NULL,
  address_line2 VARCHAR(255) NULL,
  zip_code VARCHAR(10) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES member (member_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 🧾 주문 / 주문 상세 (생성 시각만)
-- ============================================================

CREATE TABLE purchase_order (
  order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  member_id BIGINT NOT NULL,
  address_id BIGINT NULL,
  order_status VARCHAR(20) NULL,
  total_price INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES member (member_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (address_id) REFERENCES address (address_id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE order_detail (
  order_detail_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  quantity INT DEFAULT 1,
  unit_price INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES purchase_order (order_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (book_id) REFERENCES book (book_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 🗂 도서 컬렉션
-- ============================================================

CREATE TABLE book_collection (
  collection_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  display_order INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE collection_book (
  collection_book_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  collection_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  display_order INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (collection_id) REFERENCES book_collection (collection_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (book_id) REFERENCES book (book_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================
-- 🗣 리뷰 / 찜 / 문의 / 포인트 내역
-- ============================================================

CREATE TABLE review (
  review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  member_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  rating INT NULL,
  content TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES member (member_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (book_id) REFERENCES book (book_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE wishlist (
  member_id BIGINT NOT NULL,
  book_id BIGINT NOT NULL,
  PRIMARY KEY (member_id, book_id),
  FOREIGN KEY (member_id) REFERENCES member (member_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (book_id) REFERENCES book (book_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE inquiry (
  inquiry_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  member_id BIGINT NOT NULL,
  title VARCHAR(255) NULL,
  content TEXT NULL,
  status VARCHAR(20) NULL,
  answered_by BIGINT NULL,
  answered_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES member (member_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE point_history (
  point_history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  member_id BIGINT NOT NULL,
  change_amount INT NULL,
  type VARCHAR(20) NULL,
  description VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES member (member_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- insert data

INSERT INTO category (category_name) VALUES ('국내도서');
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '만화' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('헤르모드');
INSERT INTO author (name) VALUES ('와삭바삭');
INSERT INTO author (name) VALUES ('조우네');
INSERT INTO translator (name) VALUES ('최재호');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '픽미업 1', s.subcategory_id, 14850, 820, '2025-11-06', '전 세계 1억 다운로드를 기록한 극악 난이도의 모바일 가챠 게임, 《픽 미 업!》. 이 게임의 세계 랭킹 5위 ‘마스터 오브 마스터’ 로키(본명 한서진)는 평소처럼 던전을 공략하다 정체불명의 Lv.999 버그 몬스터와 마주친 순간, 그만 정신을 잃고 만다. 눈을 떠 보니,《픽 미 업!》게임 속 최약체 1성 영웅 ‘한 이스라트’가 되어 있었는데?!', 'https://image.aladin.co.kr/product/37609/38/coversum/k842032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '만화' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '헤르모드' WHERE b.title = '픽미업 1' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '와삭바삭' WHERE b.title = '픽미업 1' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '조우네' WHERE b.title = '픽미업 1' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '최재호' WHERE b.title = '픽미업 1' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '예술/대중문화' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('NoMaDoS');
INSERT INTO author (name) VALUES ('요시카와 나오야');
INSERT INTO translator (name) VALUES ('서희경');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '하울의 움직이는 성, 맨해튼을 걷다! - 애니메이션 속 건축물 현실화 프로젝트', s.subcategory_id, 15300, 850, '2025-11-12', '스크린 속 경이로운 풍경을 감상하는 것을 넘어, 그 세계를 지탱하는 보이지 않는 설계를 파헤치는 지적 탐구서다. 가상의 공간에 숨겨진 현실 건축의 법칙과 아이디어를 밝혀내며, 독자에게 단순한 감상을 넘어선 새로운 시선으로 세계를 바라보는 관점을 선사한다.', 'https://image.aladin.co.kr/product/37609/35/coversum/k882032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '예술/대중문화' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = 'NoMaDoS' WHERE b.title = '하울의 움직이는 성, 맨해튼을 걷다! - 애니메이션 속 건축물 현실화 프로젝트' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '요시카와 나오야' WHERE b.title = '하울의 움직이는 성, 맨해튼을 걷다! - 애니메이션 속 건축물 현실화 프로젝트' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '서희경' WHERE b.title = '하울의 움직이는 성, 맨해튼을 걷다! - 애니메이션 속 건축물 현실화 프로젝트' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '수험서/자격증' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('대산전기수험연구원');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 전기기사·산업기사 필기 - 단기완성 CBT 완벽 대비', s.subcategory_id, 34200, 1900, '2025-11-10', '', 'https://image.aladin.co.kr/product/37609/25/coversum/k892032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '대산전기수험연구원' WHERE b.title = '2026 전기기사·산업기사 필기 - 단기완성 CBT 완벽 대비' LIMIT 1;
INSERT INTO author (name) VALUES ('김우진');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 알기쉬운 변리사 생물 객관식 문제풀이 - 변리사 1차 시험 대비, 제2판', s.subcategory_id, 45000, 1350, '2025-11-03', '', 'https://image.aladin.co.kr/product/37609/12/coversum/k852032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김우진' WHERE b.title = '2026 알기쉬운 변리사 생물 객관식 문제풀이 - 변리사 1차 시험 대비, 제2판' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '경제경영' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('윤승진');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '숏폼력 : 숏폼 커머스 시장을 선점하라 - 숏폼 전도사가 알려주는 숏폼 커머스의 비밀', s.subcategory_id, 18000, 1000, '2025-11-01', '', 'https://image.aladin.co.kr/product/37609/12/coversum/k722032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '윤승진' WHERE b.title = '숏폼력 : 숏폼 커머스 시장을 선점하라 - 숏폼 전도사가 알려주는 숏폼 커머스의 비밀' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '역사' FROM category WHERE category_name = '국내도서';
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '신정역주 이충무공전서 2 (보급판) - 이순신의 난중일기', s.subcategory_id, 25200, 1400, '2025-11-05', '2023년 출간된 『신정역주 이충무공전서』(전4권 세트)의 무선 제본 보급판 중 두 번째 권으로, 1795년에 정조의 명으로 편찬된 『이충무공전서』 권5~권8의 내용을 담고 있다.', 'https://image.aladin.co.kr/product/37609/10/coversum/k712032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '역사' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '픽미업 1 (한정판) - 초판 한정 캐릭터카드 1종 + 글리픽 + 엽서 3종 + 북마크 2종', s.subcategory_id, 32850, 1820, '2025-11-06', '', 'https://image.aladin.co.kr/product/37609/9/coversum/k782032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '만화' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '헤르모드' WHERE b.title = '픽미업 1 (한정판) - 초판 한정 캐릭터카드 1종 + 글리픽 + 엽서 3종 + 북마크 2종' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '와삭바삭' WHERE b.title = '픽미업 1 (한정판) - 초판 한정 캐릭터카드 1종 + 글리픽 + 엽서 3종 + 북마크 2종' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '조우네' WHERE b.title = '픽미업 1 (한정판) - 초판 한정 캐릭터카드 1종 + 글리픽 + 엽서 3종 + 북마크 2종' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '최재호' WHERE b.title = '픽미업 1 (한정판) - 초판 한정 캐릭터카드 1종 + 글리픽 + 엽서 3종 + 북마크 2종' LIMIT 1;
INSERT INTO author (name) VALUES ('신호진');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 적중 출제의 포인트 형법 - 경찰·검찰·법원·변시', s.subcategory_id, 33250, 1750, '2025-11-06', '', 'https://image.aladin.co.kr/product/37608/96/coversum/k772032742_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '신호진' WHERE b.title = '2026 적중 출제의 포인트 형법 - 경찰·검찰·법원·변시' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '신정역주 이충무공전서 1 (보급판) - 이순신의 시문과 장계 외', s.subcategory_id, 25200, 1400, '2025-11-05', '2023년 출간된 『신정역주 이충무공전서』(전4권 세트)의 무선 제본 보급판 중 첫 번째 권으로, 1795년에 정조의 명으로 편찬된 『이충무공전서』 권수~권4의 내용을 담고 있다.', 'https://image.aladin.co.kr/product/37608/93/coversum/k882032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '역사' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '소설/시/희곡' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('루이스 캐럴');
INSERT INTO author (name) VALUES ('존 테니엘');
INSERT INTO translator (name) VALUES ('손인혜');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '거울 나라의 앨리스 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '최신 무삭제 완역본으로 구성된 『거울 나라의 앨리스』가 미니미니 키링북 형태로 재탄생했다. 또한 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다.', 'https://image.aladin.co.kr/product/37608/90/coversum/k852032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '루이스 캐럴' WHERE b.title = '거울 나라의 앨리스 미니미니 키링북' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '존 테니엘' WHERE b.title = '거울 나라의 앨리스 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '손인혜' WHERE b.title = '거울 나라의 앨리스 미니미니 키링북' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '종교/역학' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('정명성');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2025 대림절 묵상집 : 주님을 기다리며 - 어둠에서 빛을 향한 순례', s.subcategory_id, 2850, 90, '2025-11-10', '', 'https://image.aladin.co.kr/product/37608/90/coversum/8984309591_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '종교/역학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '정명성' WHERE b.title = '2025 대림절 묵상집 : 주님을 기다리며 - 어둠에서 빛을 향한 순례' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '초등학교참고서' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('최용준');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학리더 응용·심화 초등 수학 6-1 (2026년) - 2022 개정 교육과정, 상위권 도약을 위한 응용 심화서', s.subcategory_id, 14400, 800, '2025-11-05', '', 'https://image.aladin.co.kr/product/37608/88/coversum/k702032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최용준' WHERE b.title = '수학리더 응용·심화 초등 수학 6-1 (2026년) - 2022 개정 교육과정, 상위권 도약을 위한 응용 심화서' LIMIT 1;
INSERT INTO author (name) VALUES ('앨릭스 채');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '여행을 떠난 집오리 더키', s.subcategory_id, 16200, 900, '2025-11-20', '서울대학교를 졸업하고 구글을 비롯한 글로벌 플랫폼 IT 업계에서 활약한 앨릭스 채(Alex Chae) 작가의 작품이다. 작가는 앞서 독립출판을 통해 이 책의 1부에 해당하는 &lt;파일럿이 된 집오리&gt;를 독자들에게 소개해 잔잔한 반향을 일으켰다.', 'https://image.aladin.co.kr/product/37608/88/coversum/8967999100_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '앨릭스 채' WHERE b.title = '여행을 떠난 집오리 더키' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '에세이' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('발타사르 그라시안');
INSERT INTO translator (name) VALUES ('노희직');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '세상을 보는 지혜 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '문학의 감성을 일상에 더하는 특별한 키링북 출간! 최신 무삭제 완역본으로 구성된 『세상을 보는 지혜』가 미니미니 키링북 형태로 재탄생했다. 또한 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다.', 'https://image.aladin.co.kr/product/37608/80/coversum/k122032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '발타사르 그라시안' WHERE b.title = '세상을 보는 지혜 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '노희직' WHERE b.title = '세상을 보는 지혜 미니미니 키링북' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학리더 유형 초등 수학 6-1 (2026년) - 2022 개정 교육과정, 한 권으로 유형 올킬! 라이트 유형서', s.subcategory_id, 14400, 800, '2025-11-05', '', 'https://image.aladin.co.kr/product/37608/79/coversum/k182032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최용준' WHERE b.title = '수학리더 유형 초등 수학 6-1 (2026년) - 2022 개정 교육과정, 한 권으로 유형 올킬! 라이트 유형서' LIMIT 1;
INSERT INTO author (name) VALUES ('해법수학연구회');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학리더 응용·심화 초등 수학 5-1 (2026년) - 2022 개정 교육과정, 상위권 도약을 위한 응용 심화서', s.subcategory_id, 14400, 800, '2025-11-05', '', 'https://image.aladin.co.kr/product/37608/78/coversum/k152032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '해법수학연구회' WHERE b.title = '수학리더 응용·심화 초등 수학 5-1 (2026년) - 2022 개정 교육과정, 상위권 도약을 위한 응용 심화서' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학리더 유형 초등 수학 5-1 (2026년) - 2022 개정 교육과정, 한 권으로 유형 올킬! 라이트 유형서', s.subcategory_id, 14400, 800, '2025-11-05', '', 'https://image.aladin.co.kr/product/37608/78/coversum/k042032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '해법수학연구회' WHERE b.title = '수학리더 유형 초등 수학 5-1 (2026년) - 2022 개정 교육과정, 한 권으로 유형 올킬! 라이트 유형서' LIMIT 1;
INSERT INTO author (name) VALUES ('존 테니얼');
INSERT INTO translator (name) VALUES ('베스트트랜스');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '이상한 나라의 앨리스 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '최신 무삭제 완역본으로 구성된 『이상한 나라의 앨리스』가 미니미니 키링북 형태로 재탄생했다. 또한 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다.', 'https://image.aladin.co.kr/product/37608/77/coversum/k012032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '루이스 캐럴' WHERE b.title = '이상한 나라의 앨리스 미니미니 키링북' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '존 테니얼' WHERE b.title = '이상한 나라의 앨리스 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '베스트트랜스' WHERE b.title = '이상한 나라의 앨리스 미니미니 키링북' LIMIT 1;
INSERT INTO author (name) VALUES ('사카린스마일');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '초대교회의 순교와 박해', s.subcategory_id, 18500, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37608/76/coversum/k942032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '종교/역학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '사카린스마일' WHERE b.title = '초대교회의 순교와 박해' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '어린이' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('배시시');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '바람개비 마을의 비밀', s.subcategory_id, 14600, NULL, '2025-11-04', '', 'https://image.aladin.co.kr/product/37608/75/coversum/k932032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '배시시' WHERE b.title = '바람개비 마을의 비밀' LIMIT 1;
INSERT INTO author (name) VALUES ('칼릴 지브란');
INSERT INTO translator (name) VALUES ('유정란');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '예언자 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '문학의 감성을 일상에 더하는 특별한 키링북 출간! 최신 무삭제 완역본으로 구성된 『예언자』가 미니미니 키링북 형태로 재탄생했다. 또한 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다.', 'https://image.aladin.co.kr/product/37608/72/coversum/k922032748_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '칼릴 지브란' WHERE b.title = '예언자 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '유정란' WHERE b.title = '예언자 미니미니 키링북' LIMIT 1;
INSERT INTO author (name) VALUES ('온설');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '오늘은 그렇게 - 버티지 말고 살짝 내려놓는 하루', s.subcategory_id, 13000, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37608/69/coversum/k002032637_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '온설' WHERE b.title = '오늘은 그렇게 - 버티지 말고 살짝 내려놓는 하루' LIMIT 1;
INSERT INTO author (name) VALUES ('박소정');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '누워먹는 파인다이닝 - 일상을 먹는 시집', s.subcategory_id, 7800, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37608/66/coversum/k082032637_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '박소정' WHERE b.title = '누워먹는 파인다이닝 - 일상을 먹는 시집' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '과학' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('이정원');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '비행기의 원리 - 과학커뮤니케이터 수소가 들려주는 과학 이야기', s.subcategory_id, 14310, 790, '2025-10-20', '', 'https://image.aladin.co.kr/product/37608/64/coversum/k072032637_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이정원' WHERE b.title = '비행기의 원리 - 과학커뮤니케이터 수소가 들려주는 과학 이야기' LIMIT 1;
INSERT INTO author (name) VALUES ('레프 니콜라예비치 톨스토이');
INSERT INTO translator (name) VALUES ('장영재');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '사람은 무엇으로 사는가 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '최신 무삭제 완역본으로 구성된 『사람은 무엇으로 사는가』가 미니미니 키링북 형태로 재탄생했다. 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다.', 'https://image.aladin.co.kr/product/37608/63/coversum/k062032637_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '레프 니콜라예비치 톨스토이' WHERE b.title = '사람은 무엇으로 사는가 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '장영재' WHERE b.title = '사람은 무엇으로 사는가 미니미니 키링북' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '인문학' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('손태건');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '도덕이라는 이름의 폭력', s.subcategory_id, 26000, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37608/62/coversum/k332032636_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '인문학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '손태건' WHERE b.title = '도덕이라는 이름의 폭력' LIMIT 1;
INSERT INTO author (name) VALUES ('알퐁스 도데');
INSERT INTO translator (name) VALUES ('조정훈');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '별 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '최신 무삭제 완역본으로 구성된 『별』이 미니미니 키링북 형태로 재탄생했다. 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다. 작은 책 속에서 매일 삶의 위로와 메시지를 얻을 수 있다는 점에서, 선물용으로도 추천한다.', 'https://image.aladin.co.kr/product/37608/55/coversum/k052032637_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '알퐁스 도데' WHERE b.title = '별 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '조정훈' WHERE b.title = '별 미니미니 키링북' LIMIT 1;
INSERT INTO author (name) VALUES ('요한 볼프강 폰 괴테');
INSERT INTO translator (name) VALUES ('허승진');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '젊은 베르테르의 슬픔 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '', 'https://image.aladin.co.kr/product/37608/48/coversum/k812032536_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '요한 볼프강 폰 괴테' WHERE b.title = '젊은 베르테르의 슬픔 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '허승진' WHERE b.title = '젊은 베르테르의 슬픔 미니미니 키링북' LIMIT 1;
INSERT INTO author (name) VALUES ('알렉산드르 세르게비치 푸시킨');
INSERT INTO translator (name) VALUES ('오정석');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '삶이 그대를 속일지라도 미니미니 키링북', s.subcategory_id, 6750, 370, '2025-10-30', '최신 무삭제 완역본으로 구성된 『삶이 그대를 속일지라도』가 미니미니 키링북 형태로 재탄생했다. 또한 이 미니미니북은 pvc 커버 키링 형태로 제작되어 가방, 파우치, 열쇠 등에 달아 감성적인 포인트 아이템으로 활용 가능하다. 작은 책 속에서 매일 삶의 위로와 메시지를 얻을 수 있다는 점에서, 선물용으로도 추천한다.', 'https://image.aladin.co.kr/product/37608/47/coversum/k802032536_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '알렉산드르 세르게비치 푸시킨' WHERE b.title = '삶이 그대를 속일지라도 미니미니 키링북' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '오정석' WHERE b.title = '삶이 그대를 속일지라도 미니미니 키링북' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '주식 투자 뉴메릭 이론 #2. Twin Sum, Triple Sum', s.subcategory_id, 16000, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37608/46/coversum/k872032536_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '손태건' WHERE b.title = '주식 투자 뉴메릭 이론 #2. Twin Sum, Triple Sum' LIMIT 1;
INSERT INTO author (name) VALUES ('최원철');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '최원철의 New 상가투자바이블', s.subcategory_id, 37000, NULL, '2025-10-31', '', 'https://image.aladin.co.kr/product/37608/32/coversum/k212032436_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최원철' WHERE b.title = '최원철의 New 상가투자바이블' LIMIT 1;
INSERT INTO author (name) VALUES ('김영수');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '크리스마스 캐럴', s.subcategory_id, 10800, 600, '2025-11-03', '19세기 영국 작가 찰스 디킨스가 남긴 감동적인 작품 《크리스마스 캐럴》이 포에버영 세계 명작 03번으로 출간되었다. 이 작품은 세대를 초월해 전 세계 독자들의 사랑을 받아 온 고전이다. 포에버영 세계 명작 시리즈는 어린이 독자들이 부담 없이 책 읽기의 즐거움을 느낄 수 있도록, 원작의 깊이는 살리면서도 쉽고 따뜻한 문장으로 이야기를 풀어낸다.', 'https://image.aladin.co.kr/product/37608/28/coversum/k302032433_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김영수' WHERE b.title = '크리스마스 캐럴' LIMIT 1;
INSERT INTO author (name) VALUES ('서용환');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '빨치산 진달래꽃 - 서용환 장편소설', s.subcategory_id, 16650, 920, '2025-11-05', '일제강점기, 해방, 그리고 한국전쟁을 거치며 격동의 시대를 살아낸 한 가족의 이야기를 중심으로 펼쳐지는 서사시이다. 서정용은 자신의 외조부 정찬두와 어머니 정정숙이 살아간 질곡의 삶을 통해, 이념과 사상의 대립 속에서도 인간의 선택과 그것이 남긴 흔적들을 찾아 나선다. 그 과정에서 역사적 사실과 개인의 이야기가 교차하며, 시대의 폭풍 속에서 흔들리는 가족의 초상이 생생하게 그려진다.', 'https://image.aladin.co.kr/product/37608/13/coversum/k552032333_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '서용환' WHERE b.title = '빨치산 진달래꽃 - 서용환 장편소설' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '유아' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('박주연');
INSERT INTO author (name) VALUES ('휴이 스킵');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '듣고 보고 느끼는 생활 사운드북 세트 - 전5권', s.subcategory_id, 59400, 3300, '2025-11-05', '', 'https://image.aladin.co.kr/product/37607/86/coversum/k332032134_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '유아' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '박주연' WHERE b.title = '듣고 보고 느끼는 생활 사운드북 세트 - 전5권' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '휴이 스킵' WHERE b.title = '듣고 보고 느끼는 생활 사운드북 세트 - 전5권' LIMIT 1;
INSERT INTO author (name) VALUES ('박진수');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 세무사 재무회계연습 - 제18판', s.subcategory_id, 39000, 390, '2025-11-10', '', 'https://image.aladin.co.kr/product/37607/85/coversum/k902032139_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '박진수' WHERE b.title = '2026 세무사 재무회계연습 - 제18판' LIMIT 1;
INSERT INTO author (name) VALUES ('임천지해');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '미캔슬링', s.subcategory_id, 13900, NULL, '2025-10-25', '', 'https://image.aladin.co.kr/product/37607/83/coversum/k842032138_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '임천지해' WHERE b.title = '미캔슬링' LIMIT 1;
INSERT INTO author (name) VALUES ('정재연');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '50가지 비행기, 열기구 색칠책', s.subcategory_id, 14900, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37607/81/coversum/k832032138_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '유아' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '정재연' WHERE b.title = '50가지 비행기, 열기구 색칠책' LIMIT 1;
INSERT INTO author (name) VALUES ('김향숙');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '바다 위의 휴식 시니어 돌고래 컬러링북', s.subcategory_id, 9500, NULL, '2025-10-25', '', 'https://image.aladin.co.kr/product/37607/57/coversum/k682032038_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '유아' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김향숙' WHERE b.title = '바다 위의 휴식 시니어 돌고래 컬러링북' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '50가지 과일, 채소 색칠북', s.subcategory_id, 14900, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37607/52/coversum/k412032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '유아' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '정재연' WHERE b.title = '50가지 과일, 채소 색칠북' LIMIT 1;
INSERT INTO author (name) VALUES ('플스포');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '플스포의 메타인지 투자법 - 잃지 않는 초수익 투자의 모든 것', s.subcategory_id, 19800, 1100, '2025-11-10', '시중에 투자책은 매우 다양하고 많다. 그러나 초보 투자자들은 아무리 공부해도 투자 실패를 반복한다. 이 책은 투자에 실패하는 근본적인 원인을 깊이 분석하고, 꾸준히 수익을 내는 방법을 알려준다.', 'https://image.aladin.co.kr/product/37607/51/coversum/8947502049_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '플스포' WHERE b.title = '플스포의 메타인지 투자법 - 잃지 않는 초수익 투자의 모든 것' LIMIT 1;
INSERT INTO author (name) VALUES ('손성란');
INSERT INTO author (name) VALUES ('양채은');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '크리스마스는 이상해 - 어린이와 어른을 위한 동시', s.subcategory_id, 11700, 650, '2025-11-10', '', 'https://image.aladin.co.kr/product/37607/45/coversum/k452032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '손성란' WHERE b.title = '크리스마스는 이상해 - 어린이와 어른을 위한 동시' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '양채은' WHERE b.title = '크리스마스는 이상해 - 어린이와 어른을 위한 동시' LIMIT 1;
INSERT INTO author (name) VALUES ('진 웹스터');
INSERT INTO translator (name) VALUES ('포에버영');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '키다리 아저씨', s.subcategory_id, 10800, 600, '2025-11-03', '진 웹스터가 남긴 따뜻한 성장 이야기, 《키다리 아저씨》가 포에버영 세계 명작 시리즈로 출간되었다. 이 작품은 출간된 지 오랜 시간이 흘렀음에도 세대를 초월해 전 세계 독자들의 사랑을 받아 온 고전이다.', 'https://image.aladin.co.kr/product/37607/42/coversum/k302032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '진 웹스터' WHERE b.title = '키다리 아저씨' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '포에버영' WHERE b.title = '키다리 아저씨' LIMIT 1;
INSERT INTO author (name) VALUES ('김옥순');
INSERT INTO author (name) VALUES ('김지연');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '물방울 번지점프 - 어린이와 어른을 위한 동시', s.subcategory_id, 11700, 650, '2025-10-30', '', 'https://image.aladin.co.kr/product/37607/40/coversum/k392032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김옥순' WHERE b.title = '물방울 번지점프 - 어린이와 어른을 위한 동시' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김지연' WHERE b.title = '물방울 번지점프 - 어린이와 어른을 위한 동시' LIMIT 1;
INSERT INTO author (name) VALUES ('모구랭');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '계모인데 딸이 너무 귀여워 9 - 만화', s.subcategory_id, 14850, 820, '2025-11-06', '', 'https://image.aladin.co.kr/product/37607/40/coversum/k382032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '만화' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '모구랭' WHERE b.title = '계모인데 딸이 너무 귀여워 9 - 만화' LIMIT 1;
INSERT INTO author (name) VALUES ('김우철');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '개초보 회계 - 이보다 쉬울 수 없는 회계 기초', s.subcategory_id, 17820, 990, '2025-11-01', '숫자에 약해도, 경제를 몰라도 괜찮다. 이 책은 회계를 다시 배우고 싶은 사람, 배워도 배워도 아리송한 사람, 그리고 회계를 처음부터 제대로 알고 싶은 사람들을 위한 책이다. 회계가 낯선 이들을 위해, 이 책은 본질만 남기고 복잡한 설명은 덜어냈다.', 'https://image.aladin.co.kr/product/37607/37/coversum/k242032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김우철' WHERE b.title = '개초보 회계 - 이보다 쉬울 수 없는 회계 기초' LIMIT 1;
INSERT INTO author (name) VALUES ('윤우인');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '발레, 코레오그래피, 객체 : 윌리엄 포사이스', s.subcategory_id, 27000, 1500, '2025-11-07', '독일 태생 안무가로 출발해 전방위 예술가로 활동하고 있는 윌리엄 포사이스(William Forsythe, b.1949)의 예술세계를 비평적 시선으로 살펴보는 책이다. 단순히 인물의 전기를 다루는 평전이 아니라, 세 가지 키워드 ‘발레’, ‘코레오그래피’, ‘객체’를 두고 작품 스펙트럼을 다각도로 들여다본다.', 'https://image.aladin.co.kr/product/37607/37/coversum/k212032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '예술/대중문화' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '윤우인' WHERE b.title = '발레, 코레오그래피, 객체 : 윌리엄 포사이스' LIMIT 1;
INSERT INTO author (name) VALUES ('손영숙');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '어린왕자와 숫자별', s.subcategory_id, 8400, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37607/34/coversum/k362032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '손영숙' WHERE b.title = '어린왕자와 숫자별' LIMIT 1;
INSERT INTO author (name) VALUES ('서채빈');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 챕스랜드 소방안전관리자 2급 찐득한 스티커 예상기출문제집', s.subcategory_id, 28800, 1600, '2026-01-02', '소방안전관리자 2급을 대비할 수 있는 수험서로, 2026년 최신 개정사항을 반영하였다. 단원별 출제비중을 고려한 문제 구성으로, 최신 합격자 데이터 기반의 출제 유형을 반영하였다. OMR 카드로 마킹시간까지 체크할 수 있다.', 'https://image.aladin.co.kr/product/37607/32/coversum/k262032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '서채빈' WHERE b.title = '2026 챕스랜드 소방안전관리자 2급 찐득한 스티커 예상기출문제집' LIMIT 1;
INSERT INTO author (name) VALUES ('윤정인');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '숲속 마음의노래', s.subcategory_id, 8100, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37607/31/coversum/k252032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '윤정인' WHERE b.title = '숲속 마음의노래' LIMIT 1;
INSERT INTO author (name) VALUES ('황두환');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 스마트 실내건축기능사 실기 - 전 과정 무료 동영상 강의 | 저자 블로그를 통한 실시간 질의응답', s.subcategory_id, 28800, 1600, '2026-01-14', '컴퓨터 기반 실내건축 실기시험의 새로운 체계를 단계별로 안내한다. 기초 이론부터 실무 수준의 도면 작성 및 모델링 과정까지 체계적으로 다루어, 비전공자와 입문자도 쉽게 따라할 수 있도록 구성했다. 자격 취득은 물론 실무 역량 강화에도 도움이 된다.', 'https://image.aladin.co.kr/product/37607/29/coversum/8931512147_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '황두환' WHERE b.title = '2026 스마트 실내건축기능사 실기 - 전 과정 무료 동영상 강의 | 저자 블로그를 통한 실시간 질의응답' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '대학교재/전문서적' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('더글라스 L. 노어지');
INSERT INTO translator (name) VALUES ('라이프스타일 정신의학 연구회');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '라이프스타일 정신의학', s.subcategory_id, 38700, 2150, '2025-10-30', '', 'https://image.aladin.co.kr/product/37607/28/coversum/k152032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '대학교재/전문서적' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '더글라스 L. 노어지' WHERE b.title = '라이프스타일 정신의학' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '라이프스타일 정신의학 연구회' WHERE b.title = '라이프스타일 정신의학' LIMIT 1;
INSERT INTO author (name) VALUES ('여리');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '12월의 도피 - 행복을 찾아서', s.subcategory_id, 10000, NULL, '2025-10-23', '', 'https://image.aladin.co.kr/product/37607/27/coversum/k042032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '여리' WHERE b.title = '12월의 도피 - 행복을 찾아서' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '컴퓨터/모바일' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('씽킹데이터');
INSERT INTO translator (name) VALUES ('제갈진우');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '실무자의 게임 데이터 성장 비법 - 성공하는 게임의 데이터 사용법', s.subcategory_id, 26100, 1450, '2025-11-05', '수많은 성공 사례들에서 축적된 데이터 분석과 운영의 정수를 담고 있다. 많은 책이 분석 이론이나 도구 사용법에 집중하는 반면, 이 책은 ‘원칙’, ‘방법’, ‘도구’라는 체계적인 프레임워크를 제시하며 데이터에 접근하는 본질적인 방법을 이야기한다.', 'https://image.aladin.co.kr/product/37607/27/coversum/k002032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '컴퓨터/모바일' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '씽킹데이터' WHERE b.title = '실무자의 게임 데이터 성장 비법 - 성공하는 게임의 데이터 사용법' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '제갈진우' WHERE b.title = '실무자의 게임 데이터 성장 비법 - 성공하는 게임의 데이터 사용법' LIMIT 1;
INSERT INTO author (name) VALUES ('장이라');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '영어꽃이름 컬러링북', s.subcategory_id, 13400, NULL, '2025-10-10', '', 'https://image.aladin.co.kr/product/37607/23/coversum/k062032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '유아' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '장이라' WHERE b.title = '영어꽃이름 컬러링북' LIMIT 1;
INSERT INTO author (name) VALUES ('김경희');
INSERT INTO author (name) VALUES ('구은미');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '또솔또호의 응답하라 2', s.subcategory_id, 13500, 750, '2025-11-10', '', 'https://image.aladin.co.kr/product/37607/22/coversum/8964137787_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김경희' WHERE b.title = '또솔또호의 응답하라 2' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '구은미' WHERE b.title = '또솔또호의 응답하라 2' LIMIT 1;
INSERT INTO author (name) VALUES ('최윤순');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '판 깔아주는 흥 많은 할머니 - 다섯 손주와 엮어가는 유쾌하고 다정한 날들', s.subcategory_id, 16650, 920, '2025-11-17', '나이가 들수록 삶이 고요해진다고 믿는 이들에게, 예상 밖의 웃음과 따뜻한 감동을 건네는 책이다. 두 딸의 육아 휴직 상황에 따라 다섯 손주를 해마다 번갈아 돌봤던 시간! 7년째 ‘격년제 돌봄’을 이어가고 있는 66세의 저자는 자신을 “퇴직자가 아닌, 여전히 현역”이라 소개한다.', 'https://image.aladin.co.kr/product/37607/20/coversum/k932032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최윤순' WHERE b.title = '판 깔아주는 흥 많은 할머니 - 다섯 손주와 엮어가는 유쾌하고 다정한 날들' LIMIT 1;
INSERT INTO author (name) VALUES ('강은아');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '동동이와 룰루 미스터리 탐정 모험', s.subcategory_id, 10000, NULL, '2025-09-24', '', 'https://image.aladin.co.kr/product/37607/19/coversum/k922032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '강은아' WHERE b.title = '동동이와 룰루 미스터리 탐정 모험' LIMIT 1;
INSERT INTO author (name) VALUES ('이진아');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '생각보다 괜찮은 나를 발견했다', s.subcategory_id, 16910, 890, '2025-11-17', '우리는 매일 자기 자신과의 대화를 피하며 살아간다. 일이 바쁘다는 이유로, 가족을 챙겨야 한다는 이유로, 늘 타인의 기준에 맞춰 행동하다 보니 정작 ‘나’라는 사람은 뒷전이 된다. 그런 우리에게 “괜찮다, 그럴 수 있다”라고 말해주지 않는다. 대신, 왜 그런 감정을 느끼는지, 왜 그런 행동을 반복하는지를 차분히 짚어가며 현실적인 길을 보여준다.', 'https://image.aladin.co.kr/product/37607/19/coversum/k902032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '인문학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이진아' WHERE b.title = '생각보다 괜찮은 나를 발견했다' LIMIT 1;
INSERT INTO author (name) VALUES ('리처드 포스터');
INSERT INTO translator (name) VALUES ('윤종석');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '겸손을 배우다 - 리처드 포스터의 마지막 수업', s.subcategory_id, 15300, 850, '2025-10-31', '겸손의 의미와 가치를 찾아 나선 1년간의 영적 순례기다. 리처드 포스터는 오늘날 많은 사람들이 무엇보다 자기만족을 중시하면서 자아도취와 이기심에 빠져 겸손이라는 중요한 가치를 잃어 가고 있음을 발견한다.', 'https://image.aladin.co.kr/product/37607/17/coversum/8932823820_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '종교/역학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '리처드 포스터' WHERE b.title = '겸손을 배우다 - 리처드 포스터의 마지막 수업' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '윤종석' WHERE b.title = '겸손을 배우다 - 리처드 포스터의 마지막 수업' LIMIT 1;
INSERT INTO author (name) VALUES ('이람');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '이 밤이 오지 않았다면 사라졌을 것들 - 컬러판', s.subcategory_id, 11800, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37607/17/coversum/k992032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이람' WHERE b.title = '이 밤이 오지 않았다면 사라졌을 것들 - 컬러판' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '외국어' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('최은식');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '선택이 길을 만든다', s.subcategory_id, 8200, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37607/16/coversum/k952032931_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '외국어' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최은식' WHERE b.title = '선택이 길을 만든다' LIMIT 1;
INSERT INTO author (name) VALUES ('안창우');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '나의 스웜프 씽 - 물의 기억과 습지생태 이야기', s.subcategory_id, 17820, 990, '2025-11-25', '한 생태학자의 삶, 습지에 대한 헌신, 그리고 교육자로서의 30년 여정을 담은 회고록이자 생태문명에 대한 성찰이다. 1996년 미국 유학길에 올라 조지메이슨대학교에서 습지생태학을 가르치고 생태공학을 연구하고 습지예술에 집중했던 경험, 그리고 한국과 미국을 넘나드는 자아 정체성에 관한 이야기를 담아냈다.', 'https://image.aladin.co.kr/product/37607/15/coversum/8994242961_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '안창우' WHERE b.title = '나의 스웜프 씽 - 물의 기억과 습지생태 이야기' LIMIT 1;
INSERT INTO author (name) VALUES ('김안나');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '안나의 팡세', s.subcategory_id, 15000, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37607/15/coversum/k802032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김안나' WHERE b.title = '안나의 팡세' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '사회과학' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('안인해');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '남과 북 : 여덟 정부의 도전과 좌절 - 노태우에서 윤석열까지', s.subcategory_id, 25200, 1400, '2025-10-01', '', 'https://image.aladin.co.kr/product/37607/14/coversum/k892032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '사회과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '안인해' WHERE b.title = '남과 북 : 여덟 정부의 도전과 좌절 - 노태우에서 윤석열까지' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '청소년' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('거꾸로캠퍼스 글말랩');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '오르막길은 언제나 두렵다', s.subcategory_id, 16000, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37607/14/coversum/k882032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '청소년' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '거꾸로캠퍼스 글말랩' WHERE b.title = '오르막길은 언제나 두렵다' LIMIT 1;
INSERT INTO author (name) VALUES ('최재연');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '백앤아 고 고 캐치 고 바니몽 5 - 본격 고민 해결 코믹스', s.subcategory_id, 13500, 750, '2025-11-05', '', 'https://image.aladin.co.kr/product/37607/12/coversum/k782032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최재연' WHERE b.title = '백앤아 고 고 캐치 고 바니몽 5 - 본격 고민 해결 코믹스' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '구은미' WHERE b.title = '백앤아 고 고 캐치 고 바니몽 5 - 본격 고민 해결 코믹스' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '여행' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('엄율산');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '순례길 힙합에서트롯까지', s.subcategory_id, 14500, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37607/11/coversum/k642032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '여행' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '엄율산' WHERE b.title = '순례길 힙합에서트롯까지' LIMIT 1;
INSERT INTO author (name) VALUES ('희진 L.');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '빨간망토 토토와 반짝이는 무지개', s.subcategory_id, 14800, NULL, '2025-10-13', '', 'https://image.aladin.co.kr/product/37607/8/coversum/k682032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '희진 L.' WHERE b.title = '빨간망토 토토와 반짝이는 무지개' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '자기계발' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('데일 카네기');
INSERT INTO translator (name) VALUES ('정내현');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '데일 카네기 세트 - 전3권 (무삭제 최신 완역본, 금장 에디션) - 인간관계론 + 자기관리론 + 성공대화론', s.subcategory_id, 59400, 3300, '2025-11-30', '데일 카네기 베스트 3종을 읽는 사람은 행운아다. 인간 관계의 성공 비밀을 모두 담은 &lt;인간관계론&gt;, 성공 대화의 가장 중요한 말하기 기술을 모두 담은 &lt;성공대화론&gt;, 성공 대화의 가장 중요한 말하기 기술을 모두 담은 &lt;성공대화론&gt; 3권으로 구성된 세트.', 'https://image.aladin.co.kr/product/37607/6/coversum/k652032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '자기계발' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '데일 카네기' WHERE b.title = '데일 카네기 세트 - 전3권 (무삭제 최신 완역본, 금장 에디션) - 인간관계론 + 자기관리론 + 성공대화론' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '정내현' WHERE b.title = '데일 카네기 세트 - 전3권 (무삭제 최신 완역본, 금장 에디션) - 인간관계론 + 자기관리론 + 성공대화론' LIMIT 1;
INSERT INTO author (name) VALUES ('김혜숙');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '스위치(SWITCH) 상대의 마음을 켜는 심리 설계의 기술 - 매력부터 관계 유지까지, 사랑을 얻는 심리의 모든 것', s.subcategory_id, 18100, NULL, '2025-10-01', '', 'https://image.aladin.co.kr/product/37607/6/coversum/k432032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '자기계발' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김혜숙' WHERE b.title = '스위치(SWITCH) 상대의 마음을 켜는 심리 설계의 기술 - 매력부터 관계 유지까지, 사랑을 얻는 심리의 모든 것' LIMIT 1;
INSERT INTO author (name) VALUES ('김유리');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '불변의 프로그래밍 법칙 - 모든 프로그래밍 언어를 관통하는 핵심 원리', s.subcategory_id, 15200, NULL, '2025-10-01', '', 'https://image.aladin.co.kr/product/37607/2/coversum/k212032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '컴퓨터/모바일' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김유리' WHERE b.title = '불변의 프로그래밍 법칙 - 모든 프로그래밍 언어를 관통하는 핵심 원리' LIMIT 1;
INSERT INTO author (name) VALUES ('오희표');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '나는 고발한다, KT의 민낯을 - 어느 현직 KT 노동자의 불굴의 투쟁기', s.subcategory_id, 17100, 950, '2025-11-10', '대기업의 부당함에 맞서 노동자가 정의를 세워 가는 과정을 기록한 르포이다. 저자 오희표는 이 책을 통해 우리 모두에게 묻는다. “부당한 현실 앞에서, 당신은 침묵할 것인가? 아니면 맞설 것인가?”', 'https://image.aladin.co.kr/product/37607/1/coversum/k202032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '사회과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '오희표' WHERE b.title = '나는 고발한다, KT의 민낯을 - 어느 현직 KT 노동자의 불굴의 투쟁기' LIMIT 1;
INSERT INTO author (name) VALUES ('K.andy');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '비전공자도 이해하는 서비스 연동개발의 모든것', s.subcategory_id, 15200, NULL, '2025-09-25', '', 'https://image.aladin.co.kr/product/37607/0/coversum/k282032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '컴퓨터/모바일' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = 'K.andy' WHERE b.title = '비전공자도 이해하는 서비스 연동개발의 모든것' LIMIT 1;
INSERT INTO author (name) VALUES ('금가현');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학이 증언하는 기적 예수님의 부활', s.subcategory_id, 30000, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37606/97/coversum/k252032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '금가현' WHERE b.title = '수학이 증언하는 기적 예수님의 부활' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학이 증언하는 기적 구름기둥 불기둥 - 구름과 불의 회전, 인간정신의 수학', s.subcategory_id, 45200, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/97/coversum/k142032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '금가현' WHERE b.title = '수학이 증언하는 기적 구름기둥 불기둥 - 구름과 불의 회전, 인간정신의 수학' LIMIT 1;
INSERT INTO author (name) VALUES ('바코 하지메');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '피와 재의 여왕 5', s.subcategory_id, 6300, 350, '2025-11-10', '찬연당의 바도 VS 젠과 나나하라 콤비의 사투는 마침내 클라이맥스! 아직 개화하지 않았던 진짜 능력을 각성하는 젠. 가속시키는 힘으로 등을 밀어주는 나나하라. 승부의 행방은 어디로 향하는가?! 그리고 바도의 전투를 지원하기 위해 온 도지마의 진짜 목적은? 도미노와 그가 맺은 협정이란?!', 'https://image.aladin.co.kr/product/37606/96/coversum/k132032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '만화' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '바코 하지메' WHERE b.title = '피와 재의 여왕 5' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '수학이 증언하는 기적 하나님의 천지창조', s.subcategory_id, 30000, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37606/96/coversum/k022032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '금가현' WHERE b.title = '수학이 증언하는 기적 하나님의 천지창조' LIMIT 1;
INSERT INTO author (name) VALUES ('마쓰오카 다쓰히데');
INSERT INTO translator (name) VALUES ('최종호');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '식물원 온실 구경하기', s.subcategory_id, 12600, 700, '2025-11-25', '오늘은 할아버지 할머니와 함께 식물원 온실을 구경하러 간다. 온실에는 평소에 보기 힘든 신기한 식물이 가득하다. 망고, 바나나, 파인애플과 같은 맛있는 열대 과일이 잔뜩 열리는 과일나무도, 건조한 기후를 이겨 내며 씩씩하게 자라는 선인장도, 고약한 냄새를 풍기는 아모르포팔루스 티타눔 꽃도 모두 온실에서 만날 수 있다.', 'https://image.aladin.co.kr/product/37606/93/coversum/k902032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '유아' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '마쓰오카 다쓰히데' WHERE b.title = '식물원 온실 구경하기' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '최종호' WHERE b.title = '식물원 온실 구경하기' LIMIT 1;
INSERT INTO author (name) VALUES ('이유신');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '지방의 시간', s.subcategory_id, 19900, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/92/coversum/k982032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '사회과학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이유신' WHERE b.title = '지방의 시간' LIMIT 1;
INSERT INTO author (name) VALUES ('박지영');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '미국주식 곡소리날때 매수하라', s.subcategory_id, 17000, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/90/coversum/k972032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '박지영' WHERE b.title = '미국주식 곡소리날때 매수하라' LIMIT 1;
INSERT INTO author (name) VALUES ('이윤성');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '100세 인생 300년의 삶', s.subcategory_id, 17000, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37606/89/coversum/k962032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이윤성' WHERE b.title = '100세 인생 300년의 삶' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '건강/취미' FROM category WHERE category_name = '국내도서';
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '쏘니의 시대 축구 영어', s.subcategory_id, 18000, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/89/coversum/k952032930_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '건강/취미' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '손태건' WHERE b.title = '쏘니의 시대 축구 영어' LIMIT 1;
INSERT INTO author (name) VALUES ('김아인');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '코딩테스트에 필요한 파이썬 수학 라이브러리', s.subcategory_id, 27900, NULL, '2025-10-30', '', 'https://image.aladin.co.kr/product/37606/88/coversum/k812032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '컴퓨터/모바일' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김아인' WHERE b.title = '코딩테스트에 필요한 파이썬 수학 라이브러리' LIMIT 1;
INSERT INTO author (name) VALUES ('박동기');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '마음 따라 걷는 거야', s.subcategory_id, 19000, 600, '2025-11-15', '8개국을 트레킹하며 자연이 주는 황홀한 순간들을 생생하게 기록한 여행 에세이이다. 저자는 퇴임 후 2년 반 동안 20여 곳의 해외 원정을 포함하여 대부분의 시간을 트레킹으로 보내면서, 살아 있음을 온몸으로 느끼고 있다. 하루도 빠짐없이 남긴 기록은 간결하면서도 그날그날의 생동감이 고스란히 담고 있다.', 'https://image.aladin.co.kr/product/37606/86/coversum/k802032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '박동기' WHERE b.title = '마음 따라 걷는 거야' LIMIT 1;
INSERT INTO author (name) VALUES ('손기광');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '고전문학 박사가 만들고 엄마·아빠·선생님이 읽어주는 옛이야기 저장소', s.subcategory_id, 18900, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37606/85/coversum/k892032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '손기광' WHERE b.title = '고전문학 박사가 만들고 엄마·아빠·선생님이 읽어주는 옛이야기 저장소' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '잡지' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('대원씨아이 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '코믹 챔프 Vol.22 - 2025.11.15', s.subcategory_id, 2850, 30, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/84/coversum/k852032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '대원씨아이 편집부' WHERE b.title = '코믹 챔프 Vol.22 - 2025.11.15' LIMIT 1;
INSERT INTO author (name) VALUES ('마지운');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '길 찾는 개미', s.subcategory_id, 11800, NULL, '2025-10-25', '', 'https://image.aladin.co.kr/product/37606/84/coversum/k702032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '마지운' WHERE b.title = '길 찾는 개미' LIMIT 1;
INSERT INTO author (name) VALUES ('KR.UM');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT 'CNCF 생태계 실전 아키텍처 가이드 - 오픈소스와 쿠버네티스로 완성하는 클라우드 네이티브', s.subcategory_id, 29800, NULL, '2025-10-27', '', 'https://image.aladin.co.kr/product/37606/84/coversum/k782032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '컴퓨터/모바일' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = 'KR.UM' WHERE b.title = 'CNCF 생태계 실전 아키텍처 가이드 - 오픈소스와 쿠버네티스로 완성하는 클라우드 네이티브' LIMIT 1;
INSERT INTO author (name) VALUES ('이수진)');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '슬픔을 바늘로 뜰 수 있다면', s.subcategory_id, 8800, NULL, '2025-10-20', '', 'https://image.aladin.co.kr/product/37606/83/coversum/k662032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이수진)' WHERE b.title = '슬픔을 바늘로 뜰 수 있다면' LIMIT 1;
INSERT INTO author (name) VALUES ('월간가드닝 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '월간 가드닝 Gardening 2025.11', s.subcategory_id, 12350, 130, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/83/coversum/k652032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '월간가드닝 편집부' WHERE b.title = '월간 가드닝 Gardening 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('월간도예 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '월간 도예 2025.11', s.subcategory_id, 12350, 130, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/81/coversum/k522032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '월간도예 편집부' WHERE b.title = '월간 도예 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('5학년 6반 학생들');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '5학년 지우개반 우리는 나아간다(아뵤)', s.subcategory_id, 8800, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37606/81/coversum/k502032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '5학년 6반 학생들' WHERE b.title = '5학년 지우개반 우리는 나아간다(아뵤)' LIMIT 1;
INSERT INTO author (name) VALUES ('월간세라믹스 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '세라믹 코리아 Ceramics Korea 2025.11', s.subcategory_id, 14250, 150, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/80/coversum/k412032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '월간세라믹스 편집부' WHERE b.title = '세라믹 코리아 Ceramics Korea 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('유동영');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 화엄 탁상용 달력 - 서기 2026년 / 불기 2570년 / 단기 4359년 / 병오년 丙午年', s.subcategory_id, 13500, 750, '2025-11-04', '2026년 달력 &lt;화엄&gt;은 오랜 시간과 고요함이 깃든 열두 곳의 아름다운 화엄 사찰과 사지에서 마주한, 마음속 깊이 스며들 평화로운 순간들을 오롯이 담았다.', 'https://image.aladin.co.kr/product/37606/78/coversum/k492032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '건강/취미' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '유동영' WHERE b.title = '2026 화엄 탁상용 달력 - 서기 2026년 / 불기 2570년 / 단기 4359년 / 병오년 丙午年' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 화엄 벽걸이 달력 - 중(中) - 서기 2026년 / 불기 2570년 / 단기 4359년 / 병오년 丙午年', s.subcategory_id, 7200, 400, '2025-11-04', '2026년 달력 [화엄(華嚴)]은 오랜 시간과 고요함이 깃든 열두 곳의 아름다운 화엄 사찰과 사지(寺址)에서 마주한, 마음속 깊이 스며들 평화로운 순간들을 오롯이 담았다.', 'https://image.aladin.co.kr/product/37606/78/coversum/k472032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '건강/취미' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '유동영' WHERE b.title = '2026 화엄 벽걸이 달력 - 중(中) - 서기 2026년 / 불기 2570년 / 단기 4359년 / 병오년 丙午年' LIMIT 1;
INSERT INTO author (name) VALUES ('건축문화 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '건축문화 Architecture and Culture 2025.11', s.subcategory_id, 28500, 300, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/78/coversum/k322032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '건축문화 편집부' WHERE b.title = '건축문화 Architecture and Culture 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('김민서');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '내일을 기다리는 너에게', s.subcategory_id, 7700, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/77/coversum/k302032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '청소년' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김민서' WHERE b.title = '내일을 기다리는 너에게' LIMIT 1;
INSERT INTO author (name) VALUES ('이하우징 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '이하우징 2025.11', s.subcategory_id, 12350, 130, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/76/coversum/k392032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이하우징 편집부' WHERE b.title = '이하우징 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('주희진');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '당신은 선물입니다', s.subcategory_id, 8600, NULL, '2025-10-30', '', 'https://image.aladin.co.kr/product/37606/76/coversum/k372032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '주희진' WHERE b.title = '당신은 선물입니다' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 화엄 벽걸이 달력 - 소(小) - 서기 2026년 / 불기 2570년 / 단기 4359년 / 병오년 丙午年', s.subcategory_id, 4500, 250, '2025-11-04', '2026년 달력 [화엄(華嚴)]은 오랜 시간과 고요함이 깃든 열두 곳의 아름다운 화엄 사찰과 사지(寺址)에서 마주한, 마음속 깊이 스며들 평화로운 순간들을 오롯이 담았다.', 'https://image.aladin.co.kr/product/37606/76/coversum/k362032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '건강/취미' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '유동영' WHERE b.title = '2026 화엄 벽걸이 달력 - 소(小) - 서기 2026년 / 불기 2570년 / 단기 4359년 / 병오년 丙午年' LIMIT 1;
INSERT INTO author (name) VALUES ('사공경');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '불멸의 테이블 - 사공경 시집', s.subcategory_id, 11700, 650, '2025-11-05', '', 'https://image.aladin.co.kr/product/37606/76/coversum/8961044036_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '사공경' WHERE b.title = '불멸의 테이블 - 사공경 시집' LIMIT 1;
INSERT INTO author (name) VALUES ('시매쓰수학연구소');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '개념이 쉬워지는 생각수학 6-1 (2026년) - 2022 개정 교육과정', s.subcategory_id, 14850, 820, '2025-10-31', '초등학교 저학년들에게 익숙한 세계 명작동화나 전래동화 속 이야기를 활용하여 수학을 재미있게 배우면서 동시에 개념과 원리를 스스로 탐구하고 이해할 수 있도록 구성한 신개념 초등수학 개념 기본서다.', 'https://image.aladin.co.kr/product/37606/75/coversum/k222032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '시매쓰수학연구소' WHERE b.title = '개념이 쉬워지는 생각수학 6-1 (2026년) - 2022 개정 교육과정' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '나는 어떤 엄마가 되고 싶었던 걸까', s.subcategory_id, 11800, NULL, '2025-10-30', '', 'https://image.aladin.co.kr/product/37606/75/coversum/k292032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '주희진' WHERE b.title = '나는 어떤 엄마가 되고 싶었던 걸까' LIMIT 1;
INSERT INTO author (name) VALUES ('임베디드 월드 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '임베디드 월드 Embedded World 2025.11', s.subcategory_id, 14250, 150, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/75/coversum/k282032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '임베디드 월드 편집부' WHERE b.title = '임베디드 월드 Embedded World 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('오인사');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '나쁜 여자를 넘어 대체 불가능한 여자로', s.subcategory_id, 19600, NULL, '2025-10-24', '', 'https://image.aladin.co.kr/product/37606/74/coversum/k112032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '자기계발' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '오인사' WHERE b.title = '나쁜 여자를 넘어 대체 불가능한 여자로' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '개념이 쉬워지는 생각수학 5-1 (2026년) - 2022 개정 교육과정', s.subcategory_id, 14850, 820, '2025-10-31', '초등학교 저학년들에게 익숙한 세계 명작동화나 전래동화 속 이야기를 활용하여 수학을 재미있게 배우면서 동시에 개념과 원리를 스스로 탐구하고 이해할 수 있도록 구성한 신개념 초등수학 개념 기본서다.', 'https://image.aladin.co.kr/product/37606/74/coversum/k122032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '시매쓰수학연구소' WHERE b.title = '개념이 쉬워지는 생각수학 5-1 (2026년) - 2022 개정 교육과정' LIMIT 1;
INSERT INTO author (name) VALUES ('빅미디어 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '파크골프가이드 2025.11', s.subcategory_id, 14250, 150, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/74/coversum/k172032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '빅미디어 편집부' WHERE b.title = '파크골프가이드 2025.11' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '유형이 편해지는 생각수학 6-1 (2026년) - 2022 개정 교육과정', s.subcategory_id, 14850, 820, '2025-10-31', '', 'https://image.aladin.co.kr/product/37606/74/coversum/k252032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '시매쓰수학연구소' WHERE b.title = '유형이 편해지는 생각수학 6-1 (2026년) - 2022 개정 교육과정' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '유형이 편해지는 생각수학 5-1 (2026년) - 2022 개정 교육과정', s.subcategory_id, 14850, 820, '2025-10-31', '', 'https://image.aladin.co.kr/product/37606/74/coversum/k142032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '초등학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '시매쓰수학연구소' WHERE b.title = '유형이 편해지는 생각수학 5-1 (2026년) - 2022 개정 교육과정' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 화엄 벽걸이 달력 - 대(大)', s.subcategory_id, 9000, 500, '2025-11-04', '2026년 달력 [화엄(華嚴)]은 오랜 시간과 고요함이 깃든 열두 곳의 아름다운 화엄 사찰과 사지(寺址)에서 마주한, 마음속 깊이 스며들 평화로운 순간들을 오롯이 담았다.', 'https://image.aladin.co.kr/product/37606/74/coversum/k102032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '건강/취미' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '유동영' WHERE b.title = '2026 화엄 벽걸이 달력 - 대(大)' LIMIT 1;
INSERT INTO author (name) VALUES ('문지아');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '당신의 울음을 필사하는 하얀 밤', s.subcategory_id, 11700, 650, '2025-11-05', '', 'https://image.aladin.co.kr/product/37606/73/coversum/8961044028_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '문지아' WHERE b.title = '당신의 울음을 필사하는 하얀 밤' LIMIT 1;
INSERT INTO author (name) VALUES ('Iwasaki Hirosh');
INSERT INTO translator (name) VALUES ('서준원');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '척추 초음파의 모든것', s.subcategory_id, 90000, 2700, '2025-10-30', '', 'https://image.aladin.co.kr/product/37606/72/coversum/8964980921_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '대학교재/전문서적' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = 'Iwasaki Hirosh' WHERE b.title = '척추 초음파의 모든것' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '서준원' WHERE b.title = '척추 초음파의 모든것' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '골프가이드 GOLF guide 2025.11', s.subcategory_id, 14250, 150, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/71/coversum/k922032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '빅미디어 편집부' WHERE b.title = '골프가이드 GOLF guide 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('이왕수');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '오늘도 나는 당신의 삶에 한 잔의 커피를 권합니다', s.subcategory_id, 15120, 840, '2025-12-01', '삶의 매 순간을 배움으로 바라보는 교육자이자 사색가, 이왕수 저자의 에세이 《오늘도 나는 당신의 삶에 한 잔의 커피를 권합니다》는 일상 속 ‘배움’의 온도를 다시 느끼게 한다. 아이들을 가르치며 배우고, 관계 속에서 깨닫고, 실수 속에서 단단해지는 과정을 따뜻한 문장으로 풀어낸다.', 'https://image.aladin.co.kr/product/37606/71/coversum/k992032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이왕수' WHERE b.title = '오늘도 나는 당신의 삶에 한 잔의 커피를 권합니다' LIMIT 1;
INSERT INTO author (name) VALUES ('김달진미술연구소');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '서울아트가이드 Seoul Art Guide 2025.11', s.subcategory_id, 4650, 40, '2025-11-04', '2002년 1월 창간한『서울아트가이드』는 국내외에서 개최되는 최신 미술전시정보를 한 눈에 볼 수 있는 가장 대표적인 정보지로 국내외 미술현장 소식, 칼럼 등 정확하고 전문적인 미술정보를 발행 및 보급하여 미술계 소식소통에 기여하고 있다.', 'https://image.aladin.co.kr/product/37606/69/coversum/k952032939_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김달진미술연구소' WHERE b.title = '서울아트가이드 Seoul Art Guide 2025.11' LIMIT 1;
INSERT INTO subcategory (category_id, subcategory_name) SELECT category_id, '중학교참고서' FROM category WHERE category_name = '국내도서';
INSERT INTO author (name) VALUES ('정근창');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '혼공수학 [개념의 정식-일차방정식의 활용]', s.subcategory_id, 14900, NULL, '2025-10-24', '', 'https://image.aladin.co.kr/product/37606/69/coversum/k812032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '중학교참고서' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '정근창' WHERE b.title = '혼공수학 [개념의 정식-일차방정식의 활용]' LIMIT 1;
INSERT INTO author (name) VALUES ('수원선일초등학교 3학년 4반');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '내 마음속 무지개', s.subcategory_id, 9300, NULL, '2025-10-21', '', 'https://image.aladin.co.kr/product/37606/69/coversum/k802032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '수원선일초등학교 3학년 4반' WHERE b.title = '내 마음속 무지개' LIMIT 1;
INSERT INTO author (name) VALUES ('디지털포스트 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '디지털포스트(PC사랑) 2025.11', s.subcategory_id, 9020, 90, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/68/coversum/k892032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '디지털포스트 편집부' WHERE b.title = '디지털포스트(PC사랑) 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('수원선일초등학교 3학년 3반');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '꿈 많은 3학년3반입니다', s.subcategory_id, 9800, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/68/coversum/k872032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '수원선일초등학교 3학년 3반' WHERE b.title = '꿈 많은 3학년3반입니다' LIMIT 1;
INSERT INTO author (name) VALUES ('최민수');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '섭리 그리고 지혜 - 익어가는 인생 말보다 깊은 침묵의 선물', s.subcategory_id, 20200, NULL, '2025-10-24', '', 'https://image.aladin.co.kr/product/37606/67/coversum/k752032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최민수' WHERE b.title = '섭리 그리고 지혜 - 익어가는 인생 말보다 깊은 침묵의 선물' LIMIT 1;
INSERT INTO author (name) VALUES ('수원선일초등학교 3학년 1반');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '구름 사탕 한 조각', s.subcategory_id, 16500, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/67/coversum/k622032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '수원선일초등학교 3학년 1반' WHERE b.title = '구름 사탕 한 조각' LIMIT 1;
INSERT INTO author (name) VALUES ('김공필');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '글로벌 K명의는 병을 이렇게 다스립니다 - 세계 의료 이끄는 한국 최고 의사 31명 ''건강 특진실''', s.subcategory_id, 17100, 950, '2025-10-21', '병에 걸리면 결국 의사를 잘 만나는 것이 처음이자 끝이라고 할 수 있다. 건강할 때는 건강 정보를 찾아 읽고, 건강 프로그램을 시청하며, 건강기능식품을 챙겨 먹지만, 막상 병이 찾아오면 환자가 스스로 할 수 있는 일은 많지 않다. 책은 ‘진짜 명의는 누구인가’라는 질문에서 출발했다. 진짜 명의에게 진짜 건강 이야기를 듣는 것이 이 책의 목적이다.', 'https://image.aladin.co.kr/product/37606/65/coversum/k602032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '건강/취미' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '김공필' WHERE b.title = '글로벌 K명의는 병을 이렇게 다스립니다 - 세계 의료 이끄는 한국 최고 의사 31명 ''건강 특진실''' LIMIT 1;
INSERT INTO author (name) VALUES ('조인근');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '떠남은 사랑의 또 다른 이름', s.subcategory_id, 8100, NULL, '2025-09-26', '', 'https://image.aladin.co.kr/product/37606/65/coversum/k692032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '조인근' WHERE b.title = '떠남은 사랑의 또 다른 이름' LIMIT 1;
INSERT INTO author (name) VALUES ('정범희');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '생각의 파도 - 마인드가 부를 부른다', s.subcategory_id, 17100, 950, '2025-11-05', '', 'https://image.aladin.co.kr/product/37606/65/coversum/k672032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '자기계발' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '정범희' WHERE b.title = '생각의 파도 - 마인드가 부를 부른다' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '우리나라 예쁜 동시 따라 쓰기 - 꽃처럼 피어나는 아름다운 시', s.subcategory_id, 12420, 690, '2025-11-14', '오랜 세월 사랑받아온 우리나라의 아름다운 동시들을 다시 불러오는 책이다. 짧은 시 한 편, 따뜻한 그림 한 장, 그리고 그 시를 따라 써 내려가는 한 줄 한 줄 속에서 독자는 잊고 지냈던 감성과 평온을 되찾는다.', 'https://image.aladin.co.kr/product/37606/65/coversum/k662032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO author (name) VALUES ('블록체인투데이 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '블록체인투데이 BlockChain Today 2025.11', s.subcategory_id, 12350, 130, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/64/coversum/k652032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '블록체인투데이 편집부' WHERE b.title = '블록체인투데이 BlockChain Today 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('한울');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '우리의 빛이 머문 자리', s.subcategory_id, 12300, NULL, '2025-10-24', '', 'https://image.aladin.co.kr/product/37606/63/coversum/k502032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '청소년' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '한울' WHERE b.title = '우리의 빛이 머문 자리' LIMIT 1;
INSERT INTO author (name) VALUES ('곰단지 편집부');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '곰단지야 2025.11', s.subcategory_id, 3320, 30, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/62/coversum/k582032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '곰단지 편집부' WHERE b.title = '곰단지야 2025.11' LIMIT 1;
INSERT INTO author (name) VALUES ('권현준');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 名品 식물보호기사·산업기사 과년도 필기 - 필기 과년도, CBT 모의고사', s.subcategory_id, 24300, 1350, '2026-01-10', '', 'https://image.aladin.co.kr/product/37606/61/coversum/k442032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '권현준' WHERE b.title = '2026 名品 식물보호기사·산업기사 과년도 필기 - 필기 과년도, CBT 모의고사' LIMIT 1;
INSERT INTO author (name) VALUES ('변이삭');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '빛바랜 청춘', s.subcategory_id, 12000, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/60/coversum/k492032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '변이삭' WHERE b.title = '빛바랜 청춘' LIMIT 1;
INSERT INTO author (name) VALUES ('장상미');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '브랜뉴 스위밍클럽 - 2025 경기히든작가', s.subcategory_id, 13500, 750, '2025-11-13', '무한한 가능성을 지닌 작가들이 한국 문학의 내일로 성장할 수 있도록 지원하는 ‘경기히든작가’ 프로젝트로, 소설 부문 당선작인 장상미 연작소설 『브랜뉴 스위밍클럽』이 출간되었다. 이번 작품은 ‘브랜뉴 스위밍클럽’이라는 ‘젊음’의 판타지 공간을 배경으로 삼례, 강일, 옥정의 세 인물이 겪는 노년의 존재 가치와 열정, 사랑을 그린 세 편의 연작소설을 담았다.', 'https://image.aladin.co.kr/product/37606/60/coversum/k482032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '장상미' WHERE b.title = '브랜뉴 스위밍클럽 - 2025 경기히든작가' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 名品 종자기사/산업기사 과년도 필기 - 필기 과년도, CBT 모의고사', s.subcategory_id, 22500, 1250, '2026-01-10', '', 'https://image.aladin.co.kr/product/37606/58/coversum/k472032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '권현준' WHERE b.title = '2026 名品 종자기사/산업기사 과년도 필기 - 필기 과년도, CBT 모의고사' LIMIT 1;
INSERT INTO author (name) VALUES ('오드');
INSERT INTO author (name) VALUES ('이수현');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '둘 중 하나는 게임 오버', s.subcategory_id, 13500, 750, '2025-11-01', '주변의 모든 것이 마음에 들지 않는 아이 한솔이. 다른 세상이라면, 좀 더 멋진 모습이라면 모두가 나에게 주목하지 않을까? 작은 바람에서 시작된 한솔이의 새로운 세상 게임 속 ‘드림피아’에서 아바타가 되다. 게임과 현실 사이에서 길을 잃은 한솔이가 진짜 소중한 것을 찾고 과연 현실로 돌아올 수 있을까?', 'https://image.aladin.co.kr/product/37606/57/coversum/8909553030_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '어린이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '오드' WHERE b.title = '둘 중 하나는 게임 오버' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이수현' WHERE b.title = '둘 중 하나는 게임 오버' LIMIT 1;
INSERT INTO author (name) VALUES ('유복환');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '진주성 승전기', s.subcategory_id, 16200, 900, '2025-10-30', '임진왜란의 분수령이 된 진주성 전투를 그린 정통 역사소설. 김시민 장군과 3천의 군사가 3만의 적을 막아낸 기적 같은 승리를 통해 용기와 희생, 신념의 힘을 되새긴다.', 'https://image.aladin.co.kr/product/37606/57/coversum/k312032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '유복환' WHERE b.title = '진주성 승전기' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 名品 종자기사/산업기사 필기 - 최신 출제기준 반영', s.subcategory_id, 31500, 1750, '2026-01-10', '한 권으로 공부해도 합격할 수 있도록 출제경향을 철저하고 세밀하게 파악하여 수험생들이 쉽고 빠르게 접근할 수 있도록 이론과 기출문제를 분석하였고, 각 문제마다 충분한 해설을 하여 종자기사/산업기사 필기에 대비할 수 있도록 구성하였다.', 'https://image.aladin.co.kr/product/37606/57/coversum/k322032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '권현준' WHERE b.title = '2026 名品 종자기사/산업기사 필기 - 최신 출제기준 반영' LIMIT 1;
INSERT INTO author (name) VALUES ('아시아타임즈');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '타임 아시아 Time Asia : 2025.11.10', s.subcategory_id, 12820, 130, '2025-11-04', '', 'https://image.aladin.co.kr/product/37606/56/coversum/k372032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '잡지' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '아시아타임즈' WHERE b.title = '타임 아시아 Time Asia : 2025.11.10' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 名品 유기농업기능사 필기 - 최신 출제기준 반영', s.subcategory_id, 22500, 1250, '2026-01-10', '한 권으로 공부해도 합격할 수 있도록 출제경향을 철저하고 세밀하게 파악하여 수험생들이 쉽고 빠르게 접근할 수 있도록 이론과 기출문제를 완벽분석하였고, 각 문제마다 충분한 해설을 하여 유기농업기능사 시험에 대비할 수 있도록 구성하였다.', 'https://image.aladin.co.kr/product/37606/56/coversum/k382032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '권현준' WHERE b.title = '2026 名品 유기농업기능사 필기 - 최신 출제기준 반영' LIMIT 1;
INSERT INTO author (name) VALUES ('권오석');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '온라인 유통 성장 로드맵 - 스마트스토어, 쿠팡으로 시작하는 온라인 판매의 모든 것', s.subcategory_id, 18000, NULL, '2025-11-01', '', 'https://image.aladin.co.kr/product/37606/52/coversum/k202032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '경제경영' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '권오석' WHERE b.title = '온라인 유통 성장 로드맵 - 스마트스토어, 쿠팡으로 시작하는 온라인 판매의 모든 것' LIMIT 1;
INSERT INTO author (name) VALUES ('인자');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '삶은 도서관 - 책과 사람 사이에서 살아가는 이야기, 2025 경기히든작가 선정작', s.subcategory_id, 13500, 750, '2025-11-13', '무한한 가능성을 지닌 작가들이 한국 문학의 내일로 성장할 수 있도록 지원하는 ‘경기히든작가’ 프로젝트로, 산문 부문 당선작인 인자 작가의 에세이 『삶은 도서관』이 출간되었다. 20년간 광고·홍보 전문가로 일하던 저자가 마흔 중반, 공공도서관 노동자로 ‘제2의 인생’을 시작하며 펼쳐지는 놀라운 관찰과 성찰의 기록이다.', 'https://image.aladin.co.kr/product/37606/52/coversum/k272032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '인자' WHERE b.title = '삶은 도서관 - 책과 사람 사이에서 살아가는 이야기, 2025 경기히든작가 선정작' LIMIT 1;
INSERT INTO author (name) VALUES ('이영수');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 지적직공무원 지적전산학 기출문제집 & 합격모의고사 - 개정9판, 기술직공무원 시험 대비', s.subcategory_id, 27550, 1450, '2026-01-21', '지적직공무원 시험의 지적전산학 과목의 기출문제 및 합격모의고사를 수록하였다. 년도별 기출문제를 수록하여 문제의 출제경향분석뿐만 아니라 출제빈도 및 난이도를 수험생들이 쉽게 파악할 수 있도록 하였다.', 'https://image.aladin.co.kr/product/37606/13/coversum/k962032938_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이영수' WHERE b.title = '2026 지적직공무원 지적전산학 기출문제집 & 합격모의고사 - 개정9판, 기술직공무원 시험 대비' LIMIT 1;
INSERT INTO author (name) VALUES ('고경서');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '작은 숨고르기의 기적', s.subcategory_id, 7500, NULL, '2025-10-10', '', 'https://image.aladin.co.kr/product/37606/10/coversum/k882032837_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '에세이' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '고경서' WHERE b.title = '작은 숨고르기의 기적' LIMIT 1;
INSERT INTO author (name) VALUES ('최도성');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '인공지능(AI) 시대, 전인지능(HI)으로 답하다 - 글로벌 인재를 키우는 한동대학교의 교육 전략', s.subcategory_id, 16200, 900, '2025-11-04', '인공지능(AI) 시대에 전인지능(HI)으로 응답하며, 기독대학 한동대학교의 교육 개혁을 이끌어 온 최도성 총장의 교육 이야기다. 저자는 ‘기술이 지배하는 시대에 어떻게 교육해야 하는가’라는 담론을 던지며, 한동대학교의 사례를 통해 미래 교육의 대안과 비전을 제시한다.', 'https://image.aladin.co.kr/product/37606/10/coversum/8953152038_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '종교/역학' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '최도성' WHERE b.title = '인공지능(AI) 시대, 전인지능(HI)으로 답하다 - 글로벌 인재를 키우는 한동대학교의 교육 전략' LIMIT 1;
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '2026 지적직공무원 지적측량 기출문제집 & 합격모의고사 - 7, 9급 기술직공무원, 한국국토정보공사 시험 대비', s.subcategory_id, 27550, 1450, '2026-01-21', '지적측량 최신문제까지 포함된 2009년~2025년 35회 기출문제는 완벽한 해설로 실력평가와 생생한 합격감각을 키울 수 있도록 편찬하였다. 기출문제를 기반으로 만든 용어별 합격모의고사 20회 400문제를 수록하였다.', 'https://image.aladin.co.kr/product/37606/8/coversum/k872032837_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '수험서/자격증' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '이영수' WHERE b.title = '2026 지적직공무원 지적측량 기출문제집 & 합격모의고사 - 7, 9급 기술직공무원, 한국국토정보공사 시험 대비' LIMIT 1;
INSERT INTO author (name) VALUES ('우스이 류이치로');
INSERT INTO translator (name) VALUES ('김수경');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '세계사를 바꾼 커피 이야기', s.subcategory_id, 17100, 950, '2025-11-11', '커피는 어떻게 세계사를 바꿨을까? 이슬람 수피교도가 욕망을 억제하기 위한 도구로 마시던 ‘검은 음료’가 역설적으로 상업자본가와 정치권력자의 ‘검은 욕망’을 자극하며 아라비아와 유럽, 나아가 전 세계를 제패한 이야기를 다룬다.', 'https://image.aladin.co.kr/product/37606/8/coversum/k862032837_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '역사' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '우스이 류이치로' WHERE b.title = '세계사를 바꾼 커피 이야기' LIMIT 1;
INSERT INTO book_translator (book_id, translator_id) SELECT b.book_id, t.translator_id FROM book b JOIN translator t ON t.name = '김수경' WHERE b.title = '세계사를 바꾼 커피 이야기' LIMIT 1;
INSERT INTO author (name) VALUES ('하서연');
INSERT INTO book (title, subcategory_id, price, point, published_date, description, image_url) SELECT '여름이었다 - 별들의 이야기', s.subcategory_id, 12700, NULL, '2025-10-22', '', 'https://image.aladin.co.kr/product/37606/8/coversum/k712032837_1.jpg' FROM subcategory s JOIN category c ON s.category_id = c.category_id WHERE c.category_name = '국내도서' AND s.subcategory_name = '소설/시/희곡' LIMIT 1;
INSERT INTO book_author (book_id, author_id) SELECT b.book_id, a.author_id FROM book b JOIN author a ON a.name = '하서연' WHERE b.title = '여름이었다 - 별들의 이야기' LIMIT 1;


-- 책 정보 조회
SELECT 
    b.book_id,
    b.title,
    c.category_name,
    s.subcategory_name,
    b.price,
    b.point,
    b.published_date,
    b.description,
    b.image_url,
    GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
    GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS translators
FROM 
    book b
    JOIN subcategory s ON b.subcategory_id = s.subcategory_id
    JOIN category c ON s.category_id = c.category_id
    JOIN book_author ba ON b.book_id = ba.book_id
    JOIN author a ON ba.author_id = a.author_id
    LEFT JOIN book_translator bt ON b.book_id = bt.book_id
    LEFT JOIN translator t ON bt.translator_id = t.translator_id
GROUP BY 
    b.book_id, b.title, c.category_name, s.subcategory_name,
    b.price, b.point, b.published_date, b.description, b.image_url;


-- 1) 감성과 서사의 세계 (소설/시/희곡)
INSERT INTO book_collection (name, description, display_order)
VALUES ('감성과 서사의 세계', NULL, 1);

INSERT INTO collection_book (collection_id, book_id, display_order) VALUES
((SELECT collection_id FROM book_collection WHERE name='감성과 서사의 세계'), 10, 1),
((SELECT collection_id FROM book_collection WHERE name='감성과 서사의 세계'), 13, 2),
((SELECT collection_id FROM book_collection WHERE name='감성과 서사의 세계'), 18, 3),
((SELECT collection_id FROM book_collection WHERE name='감성과 서사의 세계'), 22, 4),
((SELECT collection_id FROM book_collection WHERE name='감성과 서사의 세계'), 23, 5),
((SELECT collection_id FROM book_collection WHERE name='감성과 서사의 세계'), 25, 6);
insert into collection_book (collection_id,book_id,display_order)
values(1,145,7);



-- 2) 상상력 성장 도서관 (어린이)
INSERT INTO book_collection (name, description, display_order)
VALUES ('상상력 성장 도서관', NULL, 2);

INSERT INTO collection_book (collection_id, book_id, display_order) VALUES
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 20, 1),
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 32, 2),
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 41, 3),
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 42, 4),
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 43, 5),
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 47, 6),
((SELECT collection_id FROM book_collection WHERE name='상상력 성장 도서관'), 55, 7);

-- 3) 트렌드 가이드 매거진 (잡지)
INSERT INTO book_collection (name, description, display_order)
VALUES ('트렌드 가이드 매거진', NULL, 3);

INSERT INTO collection_book (collection_id, book_id, display_order) VALUES
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 86, 1),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 90, 2),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 91, 3),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 93, 4),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 96, 5),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 98, 6),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 115, 7),
((SELECT collection_id FROM book_collection WHERE name='트렌드 가이드 매거진'), 118, 8);
-- 4) 시험 준비 완성 세트 (수험서/자격증)
INSERT INTO book_collection (name, description, display_order)
VALUES ('시험 준비 완성 세트', NULL, 4);

INSERT INTO collection_book (collection_id, book_id, display_order) VALUES
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 3, 1),
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 4, 2),
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 8, 3),
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 35, 4),
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 48, 5),
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 50, 6),
((SELECT collection_id FROM book_collection WHERE name='시험 준비 완성 세트'), 129, 7);
-- 5) 생각을 머무르게 하는 글들 (에세이)
INSERT INTO book_collection (name, description, display_order)
VALUES ('생각을 머무르게 하는 글들', NULL, 5);

INSERT INTO collection_book (collection_id, book_id, display_order) VALUES
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 14, 1),
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 21, 2),
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 29, 3),
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 56, 4),
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 60, 5),
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 81, 6),
((SELECT collection_id FROM book_collection WHERE name='생각을 머무르게 하는 글들'), 134, 7);

desc book_collection;
    


DROP VIEW IF EXISTS collection_vw;

CREATE VIEW collection_vw AS
SELECT
    bc.collection_id AS collectionId,
    bc.name AS collectionName,
    bc.description AS description,
    bc.display_order AS collectionDisplayOrder,
    b.book_id AS bookId,
    b.title AS title,
    b.image_url AS imageUrl,
    cb.display_order AS bookDisplayOrder
FROM book_collection bc
JOIN collection_book cb
    ON bc.collection_id = cb.collection_id
JOIN book b
    ON cb.book_id = b.book_id
ORDER BY
    bc.display_order ASC,
    cb.display_order ASC;


select * from member;
select * from inquiry;
select * from book;
select * from author;
select * from book_author;