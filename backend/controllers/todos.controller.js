import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const getTodos = async (req, res) => {
  const id = req.user.id;
  const { data } = await supabase.from("todos").select().eq("user_id", id);
  res.status(200).send(data);
};

export const updateTodos = async (req, res) => {
  const id = req.user.id;
  const paramId = req.params.id;
  const newText = req.body.todo;
  const data = await supabase
    .from("todos")
    .update({ task: newText })
    .eq("id", paramId)
    .eq("user_id", id);
  res.status(200).json({ message: "successfully updated" });
};

export const postTodos = async (req, res) => {
  const newTodo = req.body.todo;
  const id = req.user.id;
  const data = await supabase
    .from("todos")
    .insert([{ task: newTodo, user_id: id }]);
  res.status(201).send(data);
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const data = await supabase.from("todos").delete().eq("id", id);
  console.log(data);
  res.status(200).json({ message: "deleted" });
};
