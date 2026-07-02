namespace OnlineCrimeAPI.Models
{
    public class CrimeReport
    {
        public int CrimeId { get; set; }
        public string Title { get; set; }

        public string CrimeDate { get; set; }

        public string Location { get; set; }

        public string Status { get; set; }

        public int UserId { get; set; }

    }
}
