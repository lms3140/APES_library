package com.bookshop.service.book;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.book.BookCreateRequestDto;
import com.bookshop.entity.*;
import com.bookshop.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{
    public final BookRepository bookRepository;
    public final SubcategoryRepository subcategoryRepository;
    public final PublisherRepository publisherRepository;
    public final AuthorRepository authorRepository;
    public final BookAuthorRepository bookAuthorRepository;


    // 이거 쓰는건가??
    public BookDetailDto findByBookIdDetail(Long bookId) {
        BookDetailDto bookInfo = bookRepository.findDetailByBookId(bookId);
        return bookInfo;
    }

    @Override
    @Transactional
    public Long createBook(BookCreateRequestDto requestDto) {
        Subcategory subcategory = subcategoryRepository
                .getReferenceById(requestDto.getSubCategoryId());
        Publisher publisher = publisherRepository
                .getReferenceById(requestDto.getPublisherId());

        Author author = authorRepository.getReferenceById(requestDto.getAuthorId());

        Book book = Book.builder()
                .title(requestDto.getTitle())
                .price(requestDto.getPrice())
                .point(requestDto.getPoint())
                .publishedDate(requestDto.getPublishedDate())
                .description(requestDto.getDescription())
                .imageUrl(requestDto.getImageUrl())
                .subcategory(subcategory)
                .publisher(publisher)
                .build();



        Book savedBook = bookRepository.save(book);

        // 작가가 두명 이상이면 for문으로 교체가능
        BookAuthor bookAuthor = new BookAuthor(savedBook,author);

        bookAuthorRepository.save(bookAuthor);

        return savedBook.getBookId();
    }
}
