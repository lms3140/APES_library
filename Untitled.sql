use book_store;

desc address;
select * from address;
alter table address modify address_name varchar(7);
alter table address add column is_default boolean;

delete from address;