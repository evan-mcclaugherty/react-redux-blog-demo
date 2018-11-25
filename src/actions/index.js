import jsonplaceholder from '../apis/jsonPlaceholder';

export const fetchPostsandUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    const userIdSet = new Set();

    getState().posts.map(post => {
        userIdSet.add(post.userId);
    });

    userIdSet.forEach(userId => {
        dispatch(fetchUser(userId));
    });
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonplaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    });
};

export const fetchUser = id => async dispatch => {
    const response = await jsonplaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    })
}


// lodash version 
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonplaceholder.get(`/users/${id}`);

//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     })
// });