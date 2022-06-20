import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { IPostParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import PostForm from '../components/PostForm';
import { comfirm, reset, setPost } from '../redux/PostReducer';
import './PostPage.scss';
interface Props {}

const PostPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [datas, setDatas] = useState<IPostParams[]>();
  const [pages, setPages] = useState(1);
  const listPost = useSelector((state: AppState) => {
    return state.post.listPost;
  });

  const getData = useCallback(async () => {
    const json = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=1&_page=${pages}`);
    console.log(json.data);
    const results = json.data;
    dispatch(setPost(results));
  }, [pages, dispatch]);
  useEffect(() => {
    getData();
  }, [getData]);

  const handleComfirm = () => {
    dispatch(comfirm());
  };
  const handleReset = () => {
    dispatch(reset(true));
  };
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div className="btn-change">
        <div>
          <button
            type="button"
            // disabled={listPostChange && listPostChange.length > 0 ? true : false}
            className="btn"
            onClick={() => handleComfirm()}
          >
            Comfim
          </button>
        </div>
        <div>
          <button className="btn" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      </div>
      {listPost?.map((data: any, index: number) => {
        return <PostForm key={index} data={data}></PostForm>;
      })}
      <button type="button" onClick={() => setPages(pages + 1)}>
        More
      </button>
    </div>
  );
};

export default PostPage;
