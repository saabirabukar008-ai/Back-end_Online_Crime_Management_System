using OnlineCrimeAPI.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace OnlineCrimeAPI.Data
{
    public class CrimeData
    {
        string connection = @"Data Source=DESKTOP-PDV9L20\SAABIR;  Initial Catalog=OnlineCrimeManagementSystem; Integrated Security=True;    TrustServerCertificate=True";

        public List<CrimeReport> GetData()
        {
            List<CrimeReport> crimes = new List<CrimeReport>();
            SqlConnection cnn = new SqlConnection(connection);

            cnn.Open();

            string query = "select * from CrimeReports";

            SqlDataAdapter da = new SqlDataAdapter(query, cnn);

            DataTable dt = new DataTable();

            da.Fill(dt);

            foreach (DataRow item in dt.Rows)
            {
                crimes.Add(new CrimeReport
                {
                    CrimeId = int.Parse(item["CrimeId"].ToString()),
                    Title = item["Title"].ToString(),
                    CrimeDate = item["CrimeDate"].ToString(),
                    Location = item["Location"].ToString(),
                    Status = item["Status"].ToString(),
                    UserId = int.Parse(item["UserId"].ToString())
                });
            }

            return crimes;
        }
        


        // insert user data

        public void InsertData(CrimeReport add)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query =
            "insert into CrimeReports(Title,CrimeDate,Location,Status,UserId)" +
            " values(@Title,@CrimeDate,@Location,@Status,@UserId)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Title", add.Title);
            cmd.Parameters.AddWithValue("@CrimeDate", add.CrimeDate);
            cmd.Parameters.AddWithValue("@Location", add.Location);
            cmd.Parameters.AddWithValue("@Status", add.Status);
            cmd.Parameters.AddWithValue("@UserId", add.UserId);

            cnn.Open();

            cmd.ExecuteNonQuery();

            cnn.Close();
        }

        // update part of CrimeReports
        public bool UpdateData(CrimeReport update)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query =
            "update CrimeReports set Title=@Title,Location=@Location,Status=@Status where CrimeId=@CrimeId";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Title", update.Title);
            cmd.Parameters.AddWithValue("@Location", update.Location);
            cmd.Parameters.AddWithValue("@Status", update.Status);
            cmd.Parameters.AddWithValue("@CrimeId", update.CrimeId);

            cnn.Open();

            int row = cmd.ExecuteNonQuery();

            cnn.Close();

            return row > 0;
        }

        public bool DeleteCrime(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query =
            "delete from CrimeReports where CrimeId=@CrimeId";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@CrimeId", id);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }


        public CrimeReport GetById(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM CrimeReports WHERE CrimeId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            CrimeReport crime = null;

            if (dr.Read())
            {
                crime = new CrimeReport()
                {
                    CrimeId = (int)dr["CrimeId"],
                    Title = dr["Title"].ToString(),
                    CrimeDate = dr["CrimeDate"].ToString(),
                    Location = dr["Location"].ToString(),
                    Status = dr["Status"].ToString(),
                    UserId = (int)dr["UserId"]
                };
            }

            cnn.Close();

            return crime;
        }
    }


   }

