using Core.UserManagement;
using System.Collections.Generic;

namespace Ui.Infrastructure{

    public class ConnectionUserMapping{
        private Dictionary<string, string> map = new Dictionary<string, string>();

        public string this[string userId]{
            get{
                return map[userId];
            }
            set{
                map[userId] = value;
            }
        }

        
    }

}