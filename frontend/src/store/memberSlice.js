import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    isLogin: false,
    userId: null, // 로그인한 사용자 ID
  },
  reducers: {
    // 로그인 상태 설정
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    // 로그인한 사용자 ID 설정
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

// 액션 내보내기
export const { setIsLogin, setUserId } = memberSlice.actions;
// 리듀서 내보내기
export default memberSlice.reducer;
