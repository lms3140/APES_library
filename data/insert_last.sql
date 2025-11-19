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
