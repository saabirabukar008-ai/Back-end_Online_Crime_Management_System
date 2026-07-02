using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using OnlineCrimeAPI.Models;
using System.Data;

namespace OnlineCrimeAPI.Data
{
    public class UserData
    {

        string connection =
       @"Data Source=DESKTOP-PDV9L20\SAABIR;
        Initial Catalog=OnlineCrimeManagementSystem;
        Integrated Security=True;
        TrustServerCertificate=True";

        public List<Users> GetUsers()
        {
            List<Users> users = new List<Users>();

            SqlConnection cnn = new SqlConnection(connection);

            cnn.Open();

            string query = "select * from Users";

            SqlDataAdapter da = new SqlDataAdapter(query, cnn);

            DataTable dt = new DataTable();

            da.Fill(dt);

            foreach (DataRow item in dt.Rows)
            {
                users.Add(new Users
                {
                    UserId = int.Parse(item["UserId"].ToString()),
                    Fullname = item["Fullname"].ToString(),
                    Username = item["Username"].ToString(),
                    Role = item["Role"].ToString(),
                    Phone = long.Parse(item["Phone"].ToString())
                });
            }

            cnn.Close();

            return users;
        }

        public void InsertUser(Users addUser)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query =
            "insert into Users(Fullname,Username,Role,Phone) " +
            "values(@Fullname,@Username,@Role,@Phone)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Fullname", addUser.Fullname);
            cmd.Parameters.AddWithValue("@Username", addUser.Username);
            cmd.Parameters.AddWithValue("@Role", addUser.Role);
            cmd.Parameters.AddWithValue("@Phone", addUser.Phone);

            cnn.Open();

            cmd.ExecuteNonQuery();

            cnn.Close();
        }

        public bool UpdateUser(Users updateUser)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query =
            "update Users set Fullname=@Fullname, Username=@Username, Role=@Role, Phone=@Phone where UserId=@UserId";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Fullname", updateUser.Fullname);
            cmd.Parameters.AddWithValue("@Username", updateUser.Username);
            cmd.Parameters.AddWithValue("@Role", updateUser.Role);
            cmd.Parameters.AddWithValue("@Phone", updateUser.Phone);
            cmd.Parameters.AddWithValue("@UserId", updateUser.UserId);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }

        public bool DeleteUser(int userId)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "delete from Users where UserId=@UserId";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@UserId", userId);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }

        // search by id 

        public Users GetById(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM Users WHERE UserId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            Users user = null;

            if (dr.Read())
            {
                user = new Users()
                {
                    UserId = (int)dr["UserId"],
                    Fullname = dr["Fullname"].ToString(),
                    Username = dr["Username"].ToString(),
                    Role = dr["Role"].ToString(),
                    Phone = Convert.ToInt64(dr["Phone"])
                };
            }

            cnn.Close();

            return user;
        }

        // LOGIN CHECK — hubinta username + password ee database-ka
        public Users CheckLogin(string username, string password)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM Users WHERE Username=@Username AND Password=@Password";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Username", username);
            cmd.Parameters.AddWithValue("@Password", password);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            Users user = null;

            if (dr.Read())
            {
                user = new Users()
                {
                    UserId = (int)dr["UserId"],
                    Fullname = dr["Fullname"].ToString(),
                    Username = dr["Username"].ToString(),
                    Role = dr["Role"].ToString(),
                    Phone = Convert.ToInt64(dr["Phone"])
                };
            }

            cnn.Close();

            return user;
        }

    }
}