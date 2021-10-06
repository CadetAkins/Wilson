# The "Brownie Point" Algorithm

a brief explanation of the "brownie point" algorithm used by Wilson's debate system.

## What Are Brownie Points?

"Brownie Points", are a zero-sum method for calulcating a debater's relative skill in our debate system. It is a basic Bradley-Terry algorithm loosely derived from the elo system.
  
<img src="https://user-images.githubusercontent.com/82357502/136141241-5a0b9f48-4781-4f32-a177-9b90403f5861.png">
  
## How Are Brownie Points Calculated?

Brownie points are calculated using a simple equation, however before hand we must define a few variables.

* P - Points gained or lost by a user
* i - A winner for a match
* j - A loser for a match
* k - ((√i+j)/2)

P = k * (5-((i+j)/200-(200k/(i+j))))

"Brownie Points", are an equal exchange algorithm. This means that the relationship between points gained as a winner, and lost as a loser are dichotomal. For example if winner `i`, has the exact same point value as loser `j`, that being 500, then they will both gain, or lose 2 points respectively.
The gain or loss increases depending on the difference of the point values of i and j.

### Simple Python Implimentation

```py
import typing, math

def points(
  i: int,
  j: int
) -> typing.Tuple[int, int]:
  k = int(math.sqrt(i + j))
  point_factor = 5-(i+j/((200 * k) - i + j))
  return (i + (k * point_factor), j - (k * point_factor)) # value[0] = i, value[1] = j
```

### Simple Javascript Implementation

```js
function points (i, j) Array {
  var k = Math.sqrt(i + j) / 2;
  var scoreFactor = 5-(i+j)/(200-((200 * k)/(i + j)));
  return [i + (k*scoreFactor), j - (k*scoreFactor)]; // value[0] = 1, value[1] = j
}
```
