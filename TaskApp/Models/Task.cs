using System;
namespace TaskApp.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Task_text { get; set; }
        public string Task_due_date { get; set; }
        public bool Reminder { get; set; }

        public Task()
        {
        }
    }
}
