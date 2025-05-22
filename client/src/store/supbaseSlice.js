import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabaseClient";

export const supabaseClient = createAsyncThunk("/supabase/client", async () => {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (err) {
    return err;
  }
});

const supabaseSlice = createSlice({
  name: "supabase",
  initialState: {
    isLoading: false,
    isError: false,
    client: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(supabaseClient.fulfilled, (state, action) => {
        state.client = action.payload;
        state.isLoading = false;
      })
      .addCase(supabaseClient.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(supabaseClient.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default supabaseSlice.reducer;
