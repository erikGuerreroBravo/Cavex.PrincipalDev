namespace Cavex.Principal.Common
{
    public class PagedResponse<T>
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalCout { get; set; }
        public IReadOnlyList<T> Items { get; set; } = [];
    }
}
