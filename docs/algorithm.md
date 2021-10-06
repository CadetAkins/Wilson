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
* s - ((i+j)/200-(200k/(i+j)))

P(i >= j) = k * |([s]-s)|

or in a more complicated manner...

P(i >= j) = ((√i+j)/2) * (5-((i+j)/(200-200((√i+j)/2)/(i+j))))

"Brownie Points", are an equal exchange algorithm. This means that the relationship between points gained as a winner, and lost as a loser are dichotomal. For example if winner `i`, has the exact same point value as loser `j`, that being 500, then they will both gain, or lose 2 points respectively.
The gain or loss increases depending on the difference of the point values of i and j.

Now, lets run that step by step.

1. Define Variables i & j

> i, j = 500, 500

2. Find s

> k = (√500+500)/2
> k = (31.6227766017)/2
> k = 15.8113883009

3. Find s

> s = ((500 + 500)/(200-((200(15.8113883009))/(500+500))))
> s = (1000/(200-(200-((200(15.8113883009))/1000))
> s = (1000/200-(3162.27766018/1000))
> s = (1000/(200-3.16227766018))
> s = 1000/196.83772234
> s = 5.08032702326

4. Find P

> P = k*|([s]-s)|
> P = k*|(5-s)|
> P = k*|-0.08032702326|
> P = k*0.08032702326
> P = 1.27008175582

5. Subtract and Add Values Respectively

> i = i+P
> i = 501.27008175582

> j = j-P
> j = 498.729918244


### Simple Python Implimentation

```py
import typing, math

def points(
  i: int,
  j: int
) -> typing.Tuple[int, int]:
  k = int(math.sqrt(i + j))
  point_factor = abs(round((i+j/((200 * k) - i + j)))-(i+j/((200 * k) - i + j)))
  return (i + (k * point_factor), j - (k * point_factor)) # value[0] = i, value[1] = j
```

### Simple Javascript Implementation

```js
function points (i, j) Array {
  var k = Math.sqrt(i + j) / 2;
  var scoreFactor = Math.abs(Math.round((i+j)/(200-((200 * k)/(i + j)))))-(i+j)/(200-((200 * k)/(i + j))));
  return [i + (k*scoreFactor), j - (k*scoreFactor)]; // value[0] = 1, value[1] = j
}
```
