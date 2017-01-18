defmodule CloverCms.PageController do
  use CloverCms.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
