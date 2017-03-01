defmodule CloverCms.Plug.Authenticated do
  import Plug.Conn

  def init(default) do
    default
  end

  def call(conn, default) do
    permissions = conn
                  |>Plug.Conn.fetch_session
                  |>Plug.Conn.get_session(:permissions)
    if Mix.env == :test do
      conn
    else
      case permissions do
        nil ->
          conn
          |> send_resp(401, "")
          |> halt
        [] ->
          conn
          |> send_resp(401, "")
          |> halt
        [%{"can"=>"MANAGE", "on"=>"ALL"}] ->
          conn
      end
    end
  end
end
