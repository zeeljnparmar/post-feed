# Social Media Post Module (Node.js + Express + JSON Storage + Caching)

## 📌 Overview

This project implements a minimal backend module for a social media platform.  
It follows clean architecture, supports cursor-based pagination, likes, comments, shares, caching, concurrency safety, and readable timestamps.

---

## 🚀 Features

### ✅ Post Management
- Create post (text + media)
- Retrieve post with engagement data

### ✅ Feed System
- Cursor-based pagination  
- Stable ordering  
- No duplicates, no missing items  
- Supports infinite scroll

### ✅ Engagements
- Like
- Unlike
- Comment
- Share

### ✅ Caching Layer
- Feed caching
- Engagement caching
- TTL support
- Automatic invalidation
- In-memory or Redis-ready design

### ✅ Concurrency Safety
- Custom Mutex to serialize JSON file writes  
- Prevents race conditions & file corruption

### ✅ Human Readable Timestamps
Internal store:
