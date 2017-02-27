defmodule CloverCms.Admin.PermissionView do
  use CloverCms.Web, :view

  def render("permission_base.json", %{permission: permission}) do
    %{"can" => can, "on" => on} = permission
    %{can: can, on: on}
  end 
end
