using Microsoft.Data.SqlClient;
using OnlineCrimeAPI.Models;

namespace OnlineCrimeAPI.Data
{
    public class InvestigationData
    {
        string connection = @"Data Source=DESKTOP-PDV9L20\SAABIR;  Initial Catalog=OnlineCrimeManagementSystem; Integrated Security=True;    TrustServerCertificate=True";

        //  GET ALL
        public List<Investigation> GetAll()
        {
            List<Investigation> list = new List<Investigation>();

            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM Investigations";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                list.Add(new Investigation()
                {
                    InvestigationId = (int)dr["InvestigationId"],
                    OfficerName = dr["OfficerName"].ToString(),
                    InvestigationDate = dr["InvestigationDate"].ToString(),
                    Status = dr["Status"].ToString(),
                    CrimeId = (int)dr["CrimeId"]
                });
            }

            cnn.Close();

            return list;
        }

        //INSERT
        public void InsertInvestigation(Investigation i)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = @"INSERT INTO Investigations
            (OfficerName, InvestigationDate, Status, CrimeId)
            VALUES (@OfficerName, @InvestigationDate, @Status, @CrimeId)";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@OfficerName", i.OfficerName);
            cmd.Parameters.AddWithValue("@InvestigationDate", i.InvestigationDate);
            cmd.Parameters.AddWithValue("@Status", i.Status);
            cmd.Parameters.AddWithValue("@CrimeId", i.CrimeId);

            cnn.Open();
            cmd.ExecuteNonQuery();
            cnn.Close();
        }

        //  UPDATE
        public bool UpdateInvestigation(Investigation i)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = @"UPDATE Investigations
            SET OfficerName=@OfficerName,
                InvestigationDate=@InvestigationDate,
                Status=@Status,
                CrimeId=@CrimeId
            WHERE InvestigationId=@InvestigationId";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@OfficerName", i.OfficerName);
            cmd.Parameters.AddWithValue("@InvestigationDate", i.InvestigationDate);
            cmd.Parameters.AddWithValue("@Status", i.Status);
            cmd.Parameters.AddWithValue("@CrimeId", i.CrimeId);
            cmd.Parameters.AddWithValue("@InvestigationId", i.InvestigationId);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }


        //  DELETE
        public bool DeleteInvestigation(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "DELETE FROM Investigations WHERE InvestigationId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            int rows = cmd.ExecuteNonQuery();

            cnn.Close();

            return rows > 0;
        }

        //search by id
        public Investigation GetById(int id)
        {
            SqlConnection cnn = new SqlConnection(connection);

            string query = "SELECT * FROM Investigations WHERE InvestigationId=@id";

            SqlCommand cmd = new SqlCommand(query, cnn);

            cmd.Parameters.AddWithValue("@id", id);

            cnn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            Investigation investigation = null;

            if (dr.Read())
            {
                investigation = new Investigation()
                {
                    InvestigationId = (int)dr["InvestigationId"],
                    OfficerName = dr["OfficerName"].ToString(),
                    InvestigationDate = dr["InvestigationDate"].ToString(),
                    Status = dr["Status"].ToString(),
                    CrimeId = (int)dr["CrimeId"]
                };
            }

            cnn.Close();

            return investigation;
        }


    }
}

   