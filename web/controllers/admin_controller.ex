defmodule CloverCms.Admin.AdminController do
  use CloverCms.Web, :controller

  def index(conn, _params) do
    conn
    |> put_layout("admin.html")
    |> render "index.html"
  end
end
