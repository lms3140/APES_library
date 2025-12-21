package com.bookshop.service.book;

import com.bookshop.dto.BookDetailDto;
import com.bookshop.dto.book.BookCreateRequestDto;
import com.bookshop.dto.book.BookUpdateRespDto;
import com.bookshop.entity.*;
import com.bookshop.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return bookRepository.findDetailByBookId(bookId);
    }

    @Transactional
    public BookUpdateRespDto findBookDetails(Long bookId){
        Book book = bookRepository.findById(bookId)
                .orElseThrow(()->new RuntimeException("no book found"));


        List<Author> authorList = book.getBookAuthors().stream().map(BookAuthor::getAuthor).toList();

        return BookUpdateRespDto.builder()
                .title(book.getTitle())
                .subCategory(book.getSubcategory().getSubcategoryId())
                .publisher(book.getPublisher().getPublisherId())
                .price(book.getPrice())
                .point(book.getPoint())
                .publishedDate(book.getPublishedDate())
                .description(book.getDescription())
                .imageUrl(book.getImageUrl())
                .author(
                        authorList.stream()
                                .map(Author::getAuthorId)
                                .toList()
                )
                .category(book.getSubcategory().getCategory().getCategoryId())
                .build();
    }

    @Override
    @Transactional
    public Long saveBook(BookCreateRequestDto requestDto) {
        Subcategory subcategory = subcategoryRepository
                .getReferenceById(requestDto.getSubCategory().getValue());
        Publisher publisher = publisherRepository
                .getReferenceById(requestDto.getPublisher().getValue());

        List<Author> authors = requestDto.getAuthor().stream()
                .map((dto)->authorRepository.getReferenceById(dto.getValue())).toList();


        Book book = Book.builder()
                .bookId(requestDto.getBookId())
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

        bookAuthorRepository.deleteAllByBook(book);

        for (Author author : authors) {
            BookAuthor bookAuthor = new BookAuthor(savedBook, author);
            bookAuthorRepository.save(bookAuthor);
        }

        return savedBook.getBookId();
    }

}
