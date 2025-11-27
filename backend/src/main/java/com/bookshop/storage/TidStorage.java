package com.bookshop.storage;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TidStorage {

    private final ConcurrentHashMap<String, String> store = new ConcurrentHashMap<>();

    public void save(String orderId, String tid) {
        store.put(orderId, tid);
    }

    public String get(String orderId) {
        return store.get(orderId);
    }

    public void remove(String orderId) {
        store.remove(orderId);
    }
}