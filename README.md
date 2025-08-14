# Luyện Nói Tiếng Anh AI

Ứng dụng web tĩnh luyện nói tiếng Anh với AI.

## Deploy trên Netlify qua GitHub

1. Tạo repo mới trên GitHub.
2. Upload toàn bộ file trong thư mục này (bao gồm `index.html` và `README.md`) vào repo.
3. Vào Netlify → **Add new site → Import an existing project** → Chọn repo vừa tạo.
4. Build settings:
   - Build command: *(để trống)*
   - Publish directory: `./`
5. Bấm **Deploy site**.

Netlify sẽ tự build và cung cấp link để truy cập app.

---
Nếu app cần backend Python, hãy deploy API trên Render hoặc Railway và sửa code frontend để gọi API đó.
