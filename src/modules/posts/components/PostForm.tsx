import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import React, { memo, useEffect, useState } from 'react';
import { IPostParams } from '../../../models/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { reset, setPostChange } from '../redux/PostReducer';
import './PostForm.scss';
interface Props {
  data: IPostParams;
}

const PostForm = (props: Props) => {
  const dispath = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { data } = props;
  // console.log(data);
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState(data.title || '');
  const [date, setDate] = useState(Date.now());
  const { haveReset } = useSelector((state: AppState) => ({
    haveReset: state.post.isReset,
  }));

  // console.log('kieu du lieu', typeof haveReset);
  // console.log(haveReset);

  // const { listPost } = useSelector((state: AppState) => ({
  //   listPost: state.post.isReset,
  //   // listPhotoChange: state.post.listPostChange,
  // }));
  // console.log(listPost);

  useEffect(() => {
    if (title !== data.title) {
      dispath(setPostChange({ ...data, title }));
      dispath(reset(false));
    }
  }, [title]);

  useEffect(() => {
    if (haveReset === true) {
      setTitle(data.title);
    }
  }, [haveReset]);
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div>
        <Skeleton height={1000} />
        <div className="container-post">
          <div className="img-post">
            <img src={data.thumbnailUrl}></img>
          </div>
          {data.id % 2 == 1 ? (
            <div className="post-name active">
              <input
                className="input-post active"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setDate(Date.now());
                }}
              ></input>
              <div>{date}</div>
              <div>{data.id}</div>
            </div>
          ) : (
            <div className="post-name">
              <input className="input-post " value={title} onChange={(e) => setTitle(e.target.value)}></input>
              <div>{date}</div>
              <div>{data.id}</div>
            </div>
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default memo(PostForm);
