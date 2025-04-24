import express from express

const router = express.Router()

// 모든 포스트 가져오기
// 해당 아이디에 대한 post 가져오기
// GET
// http://127.0.0.1:8080/posts/
// http://127.0.0.1:8080/posts?userid=dana4777


// 글 번호에 대한 post 가져오기// GET
// GET
// http://127.0.0.1:8080/posts/:id


// post 쓰기
// POST
// http://127.0.0.1:8080/posts/
// json 형태로 입력 후 저장

// post 수정하기
// PUT
// http://127.0.0.1:8080/posts/:id
// json 형태로 입력 후 저장

// post 삭제하기
// DELETE
// http://127.0.0.1:8080/posts/:id



export default router