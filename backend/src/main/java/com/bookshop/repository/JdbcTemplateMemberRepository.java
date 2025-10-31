package com.bookshop.repository;

import com.bookshop.dto.Member;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class JdbcTemplateMemberRepository implements MemberRepository{
    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateMemberRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public String login(String id) {
        String sql= """
                
                """;
        String encodePwd = jdbcTemplate.queryForObject(sql, String.class, id);
        return encodePwd;
    }

    @Override
    public int save(Member member) {
        String sql = """
                insert into member(id, pwd, name, phone, email, mdate)
                values(?,?,?,?,?, now());
                """;
        Object [] param = {
                member.getId(),
                member.getPwd(),
                member.getName(),
                member.getPhone(),
                member.getEmail()
        };
        return jdbcTemplate.update(sql, param);
    }

    @Override
    public Long findById(String id) {
        String sql = """
                select count(id) from member where id = ?
                """;
        Long count = jdbcTemplate.queryForObject(sql, Long.class, id);
        return count;
    }
}
