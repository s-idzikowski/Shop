namespace Shop.Service.Extensions
{
    public static class PasswordExtension
    {
        public static string Password(this byte[] bytes)
        {
            return System.Text.Encoding.UTF8.GetString(bytes);
        }
    }
}