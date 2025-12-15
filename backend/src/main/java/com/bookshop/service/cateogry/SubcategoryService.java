package com.bookshop.service.cateogry;

import com.bookshop.dto.category.SubcategoryDto;
import com.bookshop.entity.Subcategory;
import com.bookshop.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;

    public List<SubcategoryDto> getSubcategoryList(Long id){
        return subcategoryRepository.findByCategoryCategoryId(id).stream().map(SubcategoryDto::new).toList();
    }

}
