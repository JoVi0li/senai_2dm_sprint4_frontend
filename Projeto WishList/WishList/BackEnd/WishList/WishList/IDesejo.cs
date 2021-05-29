using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;

namespace WishList
{
    interface IDesejo
    {
        void create(Desejo desejo);
        List<Desejo> read();

    }
}
