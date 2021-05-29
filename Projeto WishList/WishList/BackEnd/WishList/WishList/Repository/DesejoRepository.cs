using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Contexts;
using WishList.Domains;


namespace WishList.Repository
{
    public class DesejoRepository : IDesejo
    {
        WishListContext _context = new WishListContext();
        public void create(Desejo desejo)
        {
            _context.Desejos.Add(desejo);
        }

        public List<Desejo> read()
        {
            return _context.Desejos.ToList();
        }
    }
}
