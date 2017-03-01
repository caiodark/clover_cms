# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     CloverCms.Repo.insert!(%CloverCms.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias CloverCms.Repo

%CloverCms.UserType{id: id_u_t_admin} = Repo.insert! %CloverCms.UserType{
  name: "admin"
}

%CloverCms.Permission{id: id_permission} = Repo.insert! %CloverCms.Permission{
  can: "MANAGE", 
  on: "ALL"
}

%CloverCms.Role{id: role_id} = Repo.insert! %CloverCms.Role{
  name: "admin", 
  permission_id: id_permission, 
  user_type_id: id_u_t_admin
}

Repo.insert! %CloverCms.User{
  name: "admin",
  email: "cbrogliato@gmail.com",
  password: CloverCms.User.encrypt_pass("zxcv1234"),
  user_type_id: id_u_t_admin
}
