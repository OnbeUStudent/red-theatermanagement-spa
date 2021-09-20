using FakeTheaterBff.Data;
using FakeTheaterBff.Features.SyntheticBehavior;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
//test
namespace FakeTheaterBff.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class MoviesController : ControllerBase
  {
    private readonly FakeTheaterBffContext _context;
    private readonly UserInfoAccessor _userInfoAccessor;

    public MoviesController(FakeTheaterBffContext context, UserInfoAccessor userInfoAccessor)
    {
      _context = context;
      _userInfoAccessor = userInfoAccessor;
    }

    // GET: api/Movies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
    {
      return await _context.Movies
          .Include(movie => movie.MovieMetadata)
          .ToListAsync();
    }

    // GET: api/Movies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovie(string id)
    {
      if (!Guid.TryParse(id, out Guid movieIdAsGuid))
      {
        return NotFound();
      }
      var movie = await _context.Movies
                .Include(movie => movie.MovieMetadata)
                .SingleOrDefaultAsync(movie => movie.MovieId == movieIdAsGuid);
      if (movie == null)
      {
        return NotFound();
      }

      return movie;
    }
  }
}
