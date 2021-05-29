using System;
using System.Collections.Generic;

#nullable disable

namespace WishList.Domains
{
    public partial class Desejo
    {
        public Desejo()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int IdDesejo { get; set; }
        public string Descricao { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
