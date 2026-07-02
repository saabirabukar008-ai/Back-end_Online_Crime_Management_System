using Microsoft.Data.SqlClient;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Data
{
    public class CriminalData
    {

        string connection = @"Data Source=DESKTOP-PDV9L20\SAABIR;  Initial Catalog=OnlineCrimeManagementSystem; Integrated Security=True;    TrustServerCertificate=True";
        public List<Criminal> GetAll()
        {
            List<Criminal> list = new List<Criminal>();

            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM Criminals";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                list.Add(new Criminal()
                {
                    CriminalId = (int)dr["CriminalId"],
                    Fullname = dr["Fullname"].ToString(),
                    Age = (int)dr["Age"],
                    Address = dr["Address"].ToString(),
                    Gender = dr["Gender"].ToString(),
                    CrimeId = (int)dr["CrimeId"]
                });
            }

            cnn.Close();

            return list;
        }

        // ➕ INSERT
        public void InsertCriminal(Criminal c)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = @"INSERT INTO Criminals
            (Fullname, Age, Address, Gender, CrimeId)
            VALUES (@Fullname, @Age, @Address, @Gender, @CrimeId)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Fullname", c.Fullname);
            cmd.Parameters.AddWithValue("@Age", c.Age);
            cmd.Parameters.AddWithValue("@Address", c.Address);
            cmd.Parameters.AddWithValue("@Gender", c.Gender);
            cmd.Parameters.AddWithValue("@CrimeId", c.CrimeId);

            cnn.Open();
            cmd.ExecuteNonQuery();
            cnn.Close();
        }

        // ✏️ UPDATE
        public bool UpdateCriminal(Criminal c)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = @"UPDATE Criminals 
            SET Fullname=@Fullname,
                Age=@Age,
                Address=@Address,
                Gender=@Gender,
                CrimeId=@CrimeId
            WHERE CriminalId=@CriminalId";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@Fullname", c.Fullname);
            cmd.Parameters.AddWithValue("@Age", c.Age);
            cmd.Parameters.AddWithValue("@Address", c.Address);
            cmd.Parameters.AddWithValue("@Gender", c.Gender);
            cmd.Parameters.AddWithValue("@CrimeId", c.CrimeId);
            cmd.Parameters.AddWithValue("@CriminalId", c.CriminalId);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }

        // 🗑️ DELETE
        public bool DeleteCriminal(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "DELETE FROM Criminals WHERE CriminalId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }

        public Criminal GetById(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM Criminals WHERE CriminalId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            Criminal criminal = null;

            if (dr.Read())
            {
                criminal = new Criminal()
                {
                    CriminalId = (int)dr["CriminalId"],
                    Fullname = dr["Fullname"].ToString(),
                    Age = (int)dr["Age"],
                    Address = dr["Address"].ToString(),
                    Gender = dr["Gender"].ToString(),
                    CrimeId = (int)dr["CrimeId"]
                };
            }

            cnn.Close();

            return criminal;
        }

    }
}
