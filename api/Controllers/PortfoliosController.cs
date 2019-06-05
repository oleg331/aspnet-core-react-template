using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using aspnetCoreReactTemplate.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace aspnetCoreReactTemplate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PortfoliosController : Controller
    {
        private readonly DefaultDbContext _context;

        public PortfoliosController(DefaultDbContext context)
        {
            _context = context;
        }

        // GET api/portfolios
        [HttpGet]
        public IEnumerable<PortfolioItem> Get()
        {
            return _context.PortfolioItems;
        }

        // GET api/portfolios/5
        [HttpGet("{id}", Name = "GetPortfolio")]
        public PortfolioItem Get(int id)
        {
            return _context.PortfolioItems.Find(id);
        }

        // GET api/portfolios/?=
        [HttpGet("search")]
        public IEnumerable<PortfolioItem> Search(string q)
        {
            return _context.PortfolioItems.
            Where((c)=> c.Description.ToLower().Contains(q.ToLower()));
            // OrderByDescending((o) => o.DateAdded);
        }

        // POST api/portfolios
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]PortfolioItem model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PortfolioItems.Add(model);
            await _context.SaveChangesAsync();
            return CreatedAtRoute("GetPortfolio", new { id = model.Id }, model);
        }

        // PUT api/portfolios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]PortfolioItem model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            model.Id = id;
            _context.Update(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/portfolios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = new PortfolioItem() { Id = id };
            _context.Entry(item).State = EntityState.Deleted;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
