defmodule CloverCms.Admin.UserView do
  use CloverCms.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, CloverCms.Admin.UserView, "user_base.json")}
  end

  def render("user_base.json", %{user: user}) do
    %{id: user.id, name: user.name, email: user.email, type: user.user_type.name}
  end
end
