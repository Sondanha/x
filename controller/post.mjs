import { text } from "express";
import * as postRepository from "../data/post.mjs";

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserId(userid)
    : postRepository.getAll());
  res.status(200).json(data);
}

// id를 받아 하나의 포스트를 가져오는 함수
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getAllById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
}

// 포스트를 생성하는 함수
export async function createPost(req, res, next) {
  const { userid, name, text } = req.body;
  const posts = await postRepository.create(userid, name, text);
  res.status(201).json(posts);
}

// 포스트를 수정하는 함수
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const { text } = req.body; // 업데이트 내용은 바디에서 받아야함.

  const updated = await postRepository.update(id, text);
  // postRepository에 실제 update() 호출

  if (updated) {
    res.status(200).json(updated); // 업데이트된 포스트 반환
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  //   const { text } = req.body; // 안꺼내도 됨

  const deleted = await postRepository.delete(id);

  if (deleted) {
    res.status(200).json({ message: `${id}의 포스트를 삭제했습니다.` });
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
}
