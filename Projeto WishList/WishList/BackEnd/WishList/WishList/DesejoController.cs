using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;
using WishList.Repository;

namespace WishList
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class DesejoController : ControllerBase
    {
        private IDesejo _desejo { get; set; }
        public DesejoController()
        {
            _desejo = new DesejoRepository();
        }
        /// <summary>
        /// Metodo para Listar todos os desejos
        /// </summary>
        /// <returns>Retorna todos os desejos existentes no sistema</returns>
        [HttpGet]
        public IActionResult get()
        {
            return Ok(_desejo.read());
        }
        /// <summary>
        /// Metodo para Cadastrar um Desejo
        /// </summary>
        /// <param name="desejo"></param>
        /// <returns>Status Code 201</returns>
        [HttpPost]
        public IActionResult post(Desejo desejo)
        {
            _desejo.create(desejo);
            return StatusCode(201);
        }
    }
}
