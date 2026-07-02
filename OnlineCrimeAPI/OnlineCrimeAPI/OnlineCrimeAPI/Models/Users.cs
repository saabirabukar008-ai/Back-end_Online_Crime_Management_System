namespace OnlineCrimeAPI.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public long Phone { get; set; }
        public string Password { get; set; }   // ← LINE-KAN CUSUB KU DAR
    }
}