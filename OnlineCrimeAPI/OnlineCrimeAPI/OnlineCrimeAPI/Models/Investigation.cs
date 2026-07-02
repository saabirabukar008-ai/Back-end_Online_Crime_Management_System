namespace OnlineCrimeAPI.Models
{
    public class Investigation
    {
        public int InvestigationId { get; set; }
        public string OfficerName { get; set; }
        public string InvestigationDate { get; set; }
        public string Status { get; set; }
        public int CrimeId { get; set; }
    }
}
