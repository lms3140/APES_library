package com.bookshop.Controller;

import com.bookshop.dto.category.CategoryDto;
import com.bookshop.dto.category.SubcategoryDto;
import com.bookshop.service.cateogry.CategoryService;
import com.bookshop.service.cateogry.SubcategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final SubcategoryService subcategoryService;

    @GetMapping("/list")
    public List<CategoryDto> categoryDtoList(){
        return categoryService.getCategoryList();
    }

    @GetMapping("/sub-list")
    public List<SubcategoryDto> subcategoryDtoList(@RequestParam Long categoryId){
        return subcategoryService.getSubcategoryList(categoryId);
    }
}
