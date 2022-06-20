import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPostParams } from '../../../models/auth';

export interface PostState {
  listPost: IPostParams[];
  listPostChange: IPostParams[];
  isReset?: boolean;
}

export const setPost = createCustomAction('post/setPost', (data: IPostParams[]) => ({
  data,
}));
export const comfirm = createCustomAction('post/comfirm');

export const reset = createCustomAction('post/reset', (data) => ({
  data,
}));
export const setPostChange = createCustomAction('post/setPostChange', (data: IPostParams) => ({
  data,
}));

const actions = { setPost, comfirm, reset, setPostChange };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: PostState = { listPost: [], listPostChange: [], isReset: false },
  action: Action,
) {
  switch (action.type) {
    case getType(setPost): {
      return { ...state, listPost: state.listPost?.concat(action.data) };
    }

    case getType(setPostChange): {
      const post: IPostParams = action.data;
      const listPostChange: IPostParams[] = [...state.listPostChange];
      if (listPostChange.length > 0) {
        const index = listPostChange.findIndex((item) => {
          return item.id === post.id;
        });
        if (index === -1) {
          listPostChange.push(post);
        } else {
          listPostChange[index].title = post.title;
        }
      } else {
        listPostChange.push(post);
      }

      return { ...state, listPostChange };
    }

    case getType(comfirm): {
      const listPost: IPostParams[] = [...state.listPost];
      const listPostChange: IPostParams[] = [...state.listPostChange];

      for (let i = 0; i < listPost.length; i++) {
        for (let j = 0; j < listPostChange.length; j++) {
          if (listPostChange[j].id === listPost[i].id) {
            listPost[i].title = listPostChange[j].title;
          }
        }
      }
      return { ...state, listPost, listPostChange: [] };
    }
    case getType(reset): {
      return { ...state, isReset: action.data };
    }
    default:
      return state;
  }
}
