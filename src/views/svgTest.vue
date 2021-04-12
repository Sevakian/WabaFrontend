<template>
    <div >
    <ul>
        <li> M = move to </li>
        <li> L = line to </li>
        <li> H = horizontal line to </li>
        <li> V = vertical line to </li>
        <li> C = curve to </li>
        <li> S = smooth curve to </li>
        <li> Q = quadratic Bezier curve</li>
        <li> T = smooth quadratic Bezier curve to </li>
        <li> A = elliptical Arc </li>
        <li> Z = close path </li>
    </ul>  
        <svg viewBox="0 0 100 100" width=500px height=500px style="border:green solid;">
            <path stroke="green" stroke-width=".2" d="M10 0 V100" />
            <path stroke="green" stroke-width=".2" d="M20 0 V100" />
            <path stroke="green" stroke-width=".2" d="M30 0 V100" />
            <path stroke="green" stroke-width=".2" d="M40 0 V100" />
            <path stroke="green" stroke-width=".2" d="M50 0 V100" />
            <path stroke="green" stroke-width=".2" d="M60 0 V100" />
            <path stroke="green" stroke-width=".2" d="M70 0 V100" />
            <path stroke="green" stroke-width=".2" d="M80 0 V100" />
            <path stroke="green" stroke-width=".2" d="M90 0 V100" />

            <path stroke="green" stroke-width=".2" d="M0 10 H100" />
            <path stroke="green" stroke-width=".2" d="M0 20 H100" />
            <path stroke="green" stroke-width=".2" d="M0 30 H100" />
            <path stroke="green" stroke-width=".2" d="M0 40 H100" />
            <path stroke="green" stroke-width=".2" d="M0 50 H100" />
            <path stroke="green" stroke-width=".2" d="M0 60 H100" />
            <path stroke="green" stroke-width=".2" d="M0 70 H100" />
            <path stroke="green" stroke-width=".2" d="M0 80 H100" />
            <path stroke="green" stroke-width=".2" d="M0 90 H100" />
            <path d="M0 100 H0 0, 100 100" ></path>

             <!-- <path d="M0 100 C 10 40, 20 80, 30 100" stroke="black" fill="transparent"/> -->
             <!-- <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/> -->
            
        </svg>
    </div>
</template>
<script>
export default {
    
}
</script>