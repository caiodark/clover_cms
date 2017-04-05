require IEx

defmodule CloverCms.Admin.UserView do
  use CloverCms.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, CloverCms.Admin.UserView, "user_base.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, CloverCms.Admin.UserView, "user_strict.json")}
  end

  def render("user_base.json", %{user: user}) do
    %{id: user.id, name: user.name, email: user.email, type: user.user_type.name}
  end

  def render("user_strict.json", %{user: user}) do
    %{id: user.id, name: user.name, email: user.email, user_type_id: user.user_type_id}
  end

  def render("authenticate.json", %{name: name, permissions: permissions}) do
    modules = Enum.map(Application.fetch_env!(:clover_cms, :modules), fn mod -> %{module: %{name: Atom.to_string(mod)}} end)
    %{data: %{name: name, permissions: render_many(permissions, CloverCms.Admin.PermissionView, "permission_base.json"), modules: modules}}
  end

  def render("session.json", %{name: name, permissions: permissions}) do
    modules = Enum.map(Application.fetch_env!(:clover_cms, :modules), fn mod -> %{module: %{name: Atom.to_string(mod)}} end)
    %{data: %{name: name, permissions: render_many(permissions, CloverCms.Admin.PermissionView, "permission_base.json"), modules: modules}}
  end
end
