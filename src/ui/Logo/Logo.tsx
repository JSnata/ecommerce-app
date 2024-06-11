import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo() {
  const location = useLocation();
  return (
    <div>
      <Navbar.Brand href={location.pathname === '/' ? '' : '/'}>
        <div className={`d-inline-block align-top ${styles.logo}`}>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12400.000000 4200.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(0.000000,4200.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path
                d="M61860 40110 l0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0
-70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0
-70 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -140 0
-140 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -210 0 -210 -70 0 -70 0 0 -70
0 -70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -140 0 -140 0 0 70 0 70
-70 0 -70 0 0 70 0 70 -140 0 -140 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0
-70 0 0 70 0 70 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0
-70 0 -70 -70 0 -70 0 0 -280 0 -280 -70 0 -70 0 0 -770 0 -770 -140 0 -140 0
0 70 0 70 -140 0 -140 0 0 70 0 70 -140 0 -140 0 0 70 0 70 -140 0 -140 0 0
70 0 70 -140 0 -140 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -140 0 -140 0 0 70 0
70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 -560 0 -560 70
0 70 0 0 -350 0 -350 70 0 70 0 0 -210 0 -210 70 0 70 0 0 -140 0 -140 70 0
70 0 0 -140 0 -140 70 0 70 0 0 -140 0 -140 70 0 70 0 0 -70 0 -70 70 0 70 0
0 -70 0 -70 -210 0 -210 0 0 70 0 70 -280 0 -280 0 0 70 0 70 -140 0 -140 0 0
70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 -490 0 -490 70 0 70 0 0 -280 0
-280 70 0 70 0 0 -210 0 -210 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -140 0 -140
70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 70 0 70
0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 210 0 210 0 0 -70 0 -70 70 0 70 0 0
-210 0 -210 70 0 70 0 0 -140 0 -140 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0
-70 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 70 0
70 0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 210 0 210 0 0 -70 0 -70 560 0 560
0 0 70 0 70 210 0 210 0 0 70 0 70 140 0 140 0 0 70 0 70 70 0 70 0 0 70 0 70
140 0 140 0 0 70 0 70 70 0 70 0 0 70 0 70 70 0 70 0 0 140 0 140 140 0 140 0
0 -140 0 -140 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -70 0
-70 140 0 140 0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 210 0 210 0 0 -70 0 -70
560 0 560 0 0 70 0 70 210 0 210 0 0 70 0 70 140 0 140 0 0 70 0 70 70 0 70 0
0 70 0 70 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 70 0
70 0 0 140 0 140 70 0 70 0 0 70 0 70 70 0 70 0 0 210 0 210 70 0 70 0 0 70 0
70 210 0 210 0 0 70 0 70 140 0 140 0 0 70 0 70 70 0 70 0 0 70 0 70 140 0
140 0 0 70 0 70 70 0 70 0 0 70 0 70 70 0 70 0 0 140 0 140 70 0 70 0 0 140 0
140 70 0 70 0 0 140 0 140 70 0 70 0 0 280 0 280 70 0 70 0 0 490 0 490 -70 0
-70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -280 0
-280 0 0 -70 0 -70 -210 0 -210 0 0 70 0 70 70 0 70 0 0 140 0 140 70 0 70 0
0 140 0 140 70 0 70 0 0 140 0 140 70 0 70 0 0 140 0 140 70 0 70 0 0 280 0
280 70 0 70 0 0 420 0 420 70 0 70 0 0 350 0 350 -70 0 -70 0 0 -70 0 -70 -70
0 -70 0 0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140
0 -140 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -140
0 -140 0 0 -70 0 -70 -210 0 -210 0 0 -70 0 -70 -70 0 -70 0 0 770 0 770 -70
0 -70 0 0 280 0 280 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 -70 0 -70 -70 0 -70
0 0 -70 0 -70 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0
0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140 0 -140 0
0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 210
0 210 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 70 0 70
-70 0 -70 0 0 140 0 140 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 140 0 140 -70 0
-70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0
70 0 70 -140 0 -140 0 0 -70z m280 -840 l0 -70 70 0 70 0 0 -70 0 -70 70 0 70
0 0 -140 0 -140 70 0 70 0 0 -140 0 -140 70 0 70 0 0 -70 0 -70 70 0 70 0 0
-140 0 -140 70 0 70 0 0 -140 0 -140 70 0 70 0 0 -280 0 -280 -70 0 -70 0 0
-70 0 -70 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0
-140 0 -140 -560 0 -560 0 0 140 0 140 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0
70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 280 0 280 70 0 70 0 0 140 0 140
70 0 70 0 0 140 0 140 70 0 70 0 0 70 0 70 70 0 70 0 0 140 0 140 70 0 70 0 0
140 0 140 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 140 0 140 0 0 -70z m2940
-1960 l0 -630 -70 0 -70 0 0 -350 0 -350 -70 0 -70 0 0 -210 0 -210 -70 0 -70
0 0 -140 0 -140 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70 -70 0 -70
0 0 -140 0 -140 -210 0 -210 0 0 280 0 280 70 0 70 0 0 280 0 280 -70 0 -70 0
0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -140 0 -140 0 0 70 0
70 -70 0 -70 0 0 140 0 140 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 70 0 70
0 0 70 0 70 140 0 140 0 0 70 0 70 70 0 70 0 0 70 0 70 140 0 140 0 0 70 0 70
70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 140 0 140 0 0 70 0 70 70 0 70 0 0
70 0 70 70 0 70 0 0 -630z m-5880 420 l0 -70 70 0 70 0 0 -70 0 -70 140 0 140
0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 70 0 70 0 0 -70
0 -70 140 0 140 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -140 0 -140
70 0 70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -70
0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -420 0 -420 70 0
70 0 0 -210 0 -210 -70 0 -70 0 0 70 0 70 -140 0 -140 0 0 70 0 70 -70 0 -70
0 0 70 0 70 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0
140 0 140 -70 0 -70 0 0 350 0 350 -70 0 -70 0 0 700 0 700 140 0 140 0 0 -70z
m7980 -980 l0 -210 -70 0 -70 0 0 -210 0 -210 -70 0 -70 0 0 -140 0 -140 -70
0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70 -70
0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -560 0
-560 0 0 70 0 70 70 0 70 0 0 140 0 140 70 0 70 0 0 140 0 140 70 0 70 0 0
210 0 210 70 0 70 0 0 210 0 210 210 0 210 0 0 70 0 70 140 0 140 0 0 70 0 70
210 0 210 0 0 70 0 70 70 0 70 0 0 70 0 70 140 0 140 0 0 70 0 70 70 0 70 0 0
-210z m-10080 0 l0 -70 140 0 140 0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 140
0 140 0 0 -70 0 -70 210 0 210 0 0 -70 0 -70 70 0 70 0 0 -210 0 -210 70 0 70
0 0 -210 0 -210 70 0 70 0 0 -140 0 -140 70 0 70 0 0 -140 0 -140 -560 0 -560
0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 70
0 70 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 210 0
210 -70 0 -70 0 0 210 0 210 140 0 140 0 0 -70z m5600 -980 l0 -70 210 0 210
0 0 -70 0 -70 140 0 140 0 0 -140 0 -140 -140 0 -140 0 0 -70 0 -70 -210 0
-210 0 0 -70 0 -70 -700 0 -700 0 0 70 0 70 -210 0 -210 0 0 70 0 70 -140 0
-140 0 0 140 0 140 140 0 140 0 0 70 0 70 210 0 210 0 0 70 0 70 700 0 700 0
0 -70z m-1400 -1260 l0 -70 700 0 700 0 0 70 0 70 280 0 280 0 0 -70 0 -70
-70 0 -70 0 0 -210 0 -210 -140 0 -140 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70
-70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70
-70 0 -70 0 0 -70 0 -70 -140 0 -140 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0
-70 0 0 70 0 70 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 70 0 70 -140 0 -140 0
0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 210 0 210 280 0 280 0 0 -70z
m-4760 -280 l0 -70 1470 0 1470 0 0 -70 0 -70 280 0 280 0 0 -70 0 -70 140 0
140 0 0 -70 0 -70 70 0 70 0 0 -70 0 -70 140 0 140 0 0 -70 0 -70 70 0 70 0 0
-70 0 -70 70 0 70 0 0 -70 0 -70 70 0 70 0 0 -140 0 -140 -210 0 -210 0 0 -70
0 -70 -280 0 -280 0 0 -70 0 -70 -560 0 -560 0 0 -70 0 -70 -490 0 -490 0 0
70 0 70 -280 0 -280 0 0 70 0 70 -140 0 -140 0 0 70 0 70 -140 0 -140 0 0 70
0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 140 0 140
-70 0 -70 0 0 140 0 140 -70 0 -70 0 0 210 0 210 140 0 140 0 0 -70z m11200
-140 l0 -210 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -140 0 -140 -70 0 -70
0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140 0 -140 0
0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -280 0 -280 0 0 -70 0 -70 -350 0 -350
0 0 70 0 70 -630 0 -630 0 0 70 0 70 -350 0 -350 0 0 70 0 70 -210 0 -210 0 0
140 0 140 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 70 0 70 0 0 70 0 70 140 0
140 0 0 70 0 70 140 0 140 0 0 70 0 70 140 0 140 0 0 70 0 70 280 0 280 0 0
70 0 70 1330 0 1330 0 0 70 0 70 210 0 210 0 0 -210z m-6020 -1750 l0 -280
-70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -140 0 -140 -70 0 -70 0 0 -70 0 -70
-70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -140 0 -140 0 0 -70 0 -70
-140 0 -140 0 0 -70 0 -70 -560 0 -560 0 0 70 0 70 -140 0 -140 0 0 70 0 70
-140 0 -140 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0 -70 0 0 70 0 70 -70 0
-70 0 0 140 0 140 -70 0 -70 0 0 70 0 70 490 0 490 0 0 70 0 70 490 0 490 0 0
70 0 70 280 0 280 0 0 70 0 70 280 0 280 0 0 70 0 70 140 0 140 0 0 70 0 70
70 0 70 0 0 -280z m980 70 l0 -70 280 0 280 0 0 -70 0 -70 280 0 280 0 0 -70
0 -70 490 0 490 0 0 -70 0 -70 490 0 490 0 0 -70 0 -70 -70 0 -70 0 0 -140 0
-140 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0 -70 -70 0 -70 0 0 -70 0
-70 -140 0 -140 0 0 -70 0 -70 -140 0 -140 0 0 -70 0 -70 -560 0 -560 0 0 70
0 70 -140 0 -140 0 0 70 0 70 -140 0 -140 0 0 70 0 70 -70 0 -70 0 0 70 0 70
-70 0 -70 0 0 70 0 70 -70 0 -70 0 0 140 0 140 -70 0 -70 0 0 140 0 140 -70 0
-70 0 0 210 0 210 210 0 210 0 0 -70z"
              />
              <path
                d="M1500 18000 l0 -17500 60500 0 60500 0 0 17500 0 17500 -24000 0
-24000 0 0 -500 0 -500 23500 0 23500 0 0 -16500 0 -16500 -59500 0 -59500 0
0 16500 0 16500 23750 0 23750 0 0 500 0 500 -24250 0 -24250 0 0 -17500z"
              />
              <path
                d="M84990 18140 l0 -7140 845 0 845 0 3 3293 3 3292 22 152 c128 884
533 1548 1192 1953 52 33 98 58 101 57 4 -1 15 5 25 13 27 21 63 41 84 45 10
2 44 16 76 31 33 15 66 29 74 30 8 1 32 9 53 18 20 9 37 14 37 12 0 -3 15 1
34 9 18 8 36 11 40 8 3 -4 6 -1 6 6 0 7 5 9 10 6 6 -3 10 -2 10 3 0 5 14 8 30
7 17 -1 30 1 30 5 0 4 6 7 13 8 28 3 62 10 62 11 0 1 11 4 25 6 14 2 39 6 55
10 115 25 168 28 525 29 290 0 341 -2 469 -22 525 -82 927 -277 1261 -612 462
-462 713 -1092 760 -1905 6 -104 10 -1387 10 -3317 l0 -3148 850 0 851 0 -4
3333 c-3 2471 -7 3363 -15 3452 -63 636 -143 1007 -309 1425 -283 717 -740
1309 -1338 1736 -604 430 -1286 647 -2151 683 -873 37 -1605 -143 -2204 -540
-227 -151 -465 -362 -643 -569 l-47 -55 0 2408 0 2407 -845 0 -845 0 0 -7140z"
              />
              <path
                d="M11260 18125 l0 -7135 870 0 870 0 0 3325 0 3325 3220 0 3220 0 0
770 0 770 -3220 0 -3220 0 0 2265 0 2265 3410 0 3410 0 0 775 0 775 -4280 0
-4280 0 0 -7135z"
              />
              <path
                d="M21960 18110 l0 -7120 845 0 845 0 0 7120 0 7120 -845 0 -845 0 0
-7120z"
              />
              <path
                d="M109980 21630 c-669 -31 -1226 -220 -1656 -562 -157 -124 -333 -309
-453 -475 -24 -35 -46 -61 -48 -60 -1 2 -17 185 -33 408 -17 222 -33 419 -36
437 l-5 32 -794 0 -795 0 0 -7340 0 -7340 845 0 845 0 0 2541 0 2541 96 -92
c260 -248 552 -451 880 -611 397 -194 776 -299 1224 -340 187 -17 656 -6 845
20 1159 158 2138 779 2778 1762 434 666 726 1482 851 2377 60 429 80 725 80
1212 0 605 -40 1032 -144 1554 -259 1290 -857 2365 -1715 3081 -718 600 -1700
903 -2765 855z m457 -1615 c412 -53 787 -219 1138 -502 141 -114 365 -347 478
-499 399 -534 666 -1265 761 -2079 33 -282 40 -429 40 -795 0 -605 -45 -1031
-159 -1495 -191 -776 -550 -1425 -993 -1796 -323 -270 -676 -426 -1122 -494
-147 -22 -459 -31 -590 -16 -501 57 -1010 312 -1365 682 -379 396 -628 903
-724 1474 -46 276 -46 267 -46 1740 0 1535 -1 1498 61 1819 137 702 569 1354
1111 1672 291 172 541 253 918 297 87 11 386 5 492 -8z"
              />
              <path
                d="M55433 21619 c-1129 -53 -2134 -535 -2876 -1379 -710 -808 -1150
-1933 -1271 -3250 -41 -444 -46 -1137 -12 -1520 78 -851 268 -1569 595 -2245
255 -526 534 -919 946 -1330 307 -308 547 -483 925 -674 459 -233 920 -368
1490 -437 179 -22 761 -31 971 -15 736 55 1369 243 1892 564 623 382 1160 946
1543 1622 59 104 240 469 257 517 7 21 78 -2 -838 268 -412 121 -755 222 -762
225 -7 2 -39 -52 -77 -131 -374 -771 -941 -1252 -1681 -1427 -240 -57 -374
-71 -700 -71 -316 -1 -414 7 -650 50 -678 124 -1199 459 -1562 1004 -387 581
-599 1320 -630 2197 l-6 183 3549 2 3549 3 -3 210 c-10 737 -92 1397 -254
2040 -181 721 -545 1493 -966 2049 -233 307 -551 629 -819 828 -500 371 -1139
613 -1823 692 -127 15 -512 37 -590 34 -19 0 -108 -5 -197 -9z m547 -1595
c153 -18 390 -75 528 -128 436 -167 824 -484 1099 -895 266 -398 463 -925 578
-1544 14 -76 25 -140 25 -143 0 -2 -1151 -4 -2559 -4 l-2558 0 3 23 c78 505
154 761 344 1168 97 207 217 419 275 485 6 6 17 22 25 34 8 13 23 31 32 41 9
10 23 29 30 42 17 31 100 126 203 231 202 204 441 377 678 491 216 104 444
170 690 199 157 19 444 19 607 0z"
              />
              <path
                d="M29795 21570 c-960 -59 -1795 -387 -2466 -968 -125 -108 -358 -344
-455 -462 -652 -785 -1053 -1829 -1178 -3070 -42 -408 -54 -1079 -28 -1445 67
-915 250 -1646 586 -2340 263 -542 575 -985 986 -1395 297 -298 565 -492 929
-674 517 -259 1031 -386 1691 -416 738 -34 1452 109 2060 414 414 208 735 440
1071 775 361 362 622 729 863 1216 440 888 642 1902 623 3120 -23 1399 -319
2468 -954 3439 -322 492 -768 938 -1227 1227 -407 255 -964 453 -1503 534
-280 42 -724 62 -998 45z m680 -1588 c388 -68 727 -215 1045 -455 134 -102
349 -320 457 -464 387 -516 637 -1247 727 -2123 55 -529 45 -1230 -25 -1715
-128 -901 -443 -1627 -935 -2155 -187 -202 -358 -334 -594 -458 -98 -52 -310
-140 -357 -148 -15 -3 -30 -7 -35 -10 -4 -3 -17 -7 -28 -10 -11 -2 -30 -6 -42
-9 -13 -3 -34 -7 -48 -10 -14 -3 -35 -7 -47 -10 -13 -3 -33 -7 -45 -10 -128
-29 -261 -37 -510 -32 -283 6 -403 21 -618 81 -486 134 -941 454 -1270 892
-514 683 -785 1752 -756 2989 19 867 146 1509 422 2144 141 324 356 642 599
887 366 369 808 570 1405 638 19 2 148 3 285 1 198 -2 275 -7 370 -23z"
              />
              <path
                d="M99497 21569 c-1341 -78 -2471 -715 -3192 -1799 -534 -804 -832
-1756 -925 -2950 -18 -231 -24 -805 -11 -1055 49 -952 233 -1730 584 -2467
343 -720 891 -1401 1448 -1799 286 -205 663 -393 1008 -503 639 -206 1458
-257 2141 -135 740 132 1396 451 1979 963 580 509 1058 1270 1336 2126 162
501 260 1035 307 1665 15 218 16 910 0 1130 -92 1270 -391 2203 -993 3095 -84
125 -218 304 -238 320 -4 3 -37 41 -75 85 -118 137 -225 244 -395 392 -313
274 -579 444 -926 591 -445 188 -851 289 -1340 332 -164 14 -540 19 -708 9z
m663 -1584 c621 -99 1166 -435 1547 -952 501 -679 768 -1772 740 -3023 -18
-794 -140 -1423 -387 -1991 -54 -125 -186 -377 -255 -489 -168 -270 -421 -557
-633 -719 -291 -221 -622 -358 -1007 -417 -183 -28 -613 -26 -785 4 -256 44
-428 100 -651 213 -929 470 -1466 1454 -1606 2939 -22 233 -25 994 -5 1220 55
624 152 1069 339 1550 194 499 531 973 881 1239 303 229 695 384 1105 436 153
19 571 14 717 -10z"
              />
              <path
                d="M65875 21563 c-621 -37 -1227 -270 -1705 -654 -127 -102 -348 -321
-450 -446 -41 -50 -76 -91 -77 -89 -2 1 -16 205 -33 452 -17 247 -33 464 -36
482 l-5 32 -794 0 -795 0 0 -5165 0 -5165 845 0 845 0 0 3093 c0 2016 4 3148
10 3252 36 553 144 990 342 1387 314 627 751 949 1413 1040 161 22 686 15 705
-10 3 -4 20 -7 38 -7 19 1 36 -3 38 -7 3 -4 14 -8 25 -8 10 0 19 -5 19 -11 0
-6 6 -9 13 -6 6 2 24 -2 40 -10 15 -7 27 -11 27 -7 0 4 7 1 15 -6 8 -7 15 -10
15 -6 0 4 13 0 30 -9 16 -8 32 -15 35 -15 28 1 37 -1 31 -7 -3 -4 20 -18 51
-31 32 -13 70 -33 85 -44 16 -10 32 -16 38 -13 5 3 10 1 10 -5 0 -6 12 -16 28
-22 34 -15 86 -52 213 -150 98 -78 99 -78 113 -55 52 82 900 1535 903 1549 8
28 -292 220 -526 337 -477 238 -1014 354 -1506 324z"
              />
              <path
                d="M78806 21559 c-415 -23 -832 -100 -1200 -223 -905 -303 -1675 -918
-2016 -1611 -150 -306 -217 -578 -227 -930 -21 -740 194 -1384 626 -1872 239
-271 671 -546 1239 -790 366 -157 672 -263 1047 -363 606 -162 1219 -351 1620
-500 458 -171 721 -309 933 -489 104 -88 249 -292 319 -448 66 -149 95 -361
74 -542 -17 -143 -51 -255 -121 -396 -292 -588 -971 -951 -1915 -1026 -165
-13 -603 -7 -745 11 -914 113 -1540 520 -1831 1195 -46 106 -119 336 -119 376
0 10 -5 19 -12 19 -6 0 -379 -178 -829 -397 l-817 -396 20 -51 c74 -189 197
-422 325 -615 345 -520 844 -963 1427 -1267 540 -281 1171 -447 1878 -495 359
-24 882 -4 1223 46 1356 200 2492 905 3022 1875 303 553 389 1275 228 1910
-79 311 -245 630 -466 895 -185 222 -425 450 -638 608 -245 182 -679 407
-1243 643 -286 120 -665 254 -1302 460 -763 246 -1073 360 -1391 513 -241 116
-291 150 -431 293 -238 242 -304 399 -304 720 0 203 38 344 138 516 259 443
733 682 1477 743 207 17 644 7 811 -19 676 -105 1174 -417 1531 -959 l74 -112
42 18 c287 125 1525 665 1535 670 20 11 -173 288 -334 478 -377 446 -846 819
-1354 1077 -651 331 -1442 481 -2294 435z"
              />
              <path
                d="M35892 21293 c3 -10 684 -2332 1513 -5161 l1509 -5142 889 2 890 3
1051 3957 c578 2177 1053 3958 1056 3958 3 0 480 -1761 1060 -3912 579 -2152
1059 -3934 1067 -3960 l14 -48 889 0 c490 0 890 2 890 5 0 3 677 2323 1505
5154 828 2832 1505 5151 1505 5155 0 3 -413 5 -917 4 l-917 -3 -1031 -4037
c-567 -2221 -1033 -4039 -1036 -4042 -2 -3 -500 1814 -1105 4037 l-1101 4042
-807 0 -808 0 -1101 -4042 c-605 -2224 -1103 -4041 -1105 -4038 -3 2 -469
1821 -1036 4042 l-1032 4038 -923 3 c-876 2 -923 1 -919 -15z"
              />
            </g>
          </svg>
        </div>
      </Navbar.Brand>
    </div>
  );
}