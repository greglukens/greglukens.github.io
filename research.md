---
layout: page
title: Research
permalink: /research/
---

<div class="research-block">
  <h3 class="project-title">Primordial non-Gaussianity</h3>
  <p class="project-tagline" markdown="1"> 
    The modern understanding of physical cosmology incorporates an inflationary epoch just after the Big Bang, in which the universe expanded by many orders of magnitude. During this period of inflation, quantum fluctuations grew in size to macroscopic scales and became the seeds for all structure in the universe. The exact statistical composition of these so-called *primordial density perturbations* is an open question in physical cosmology, the answer of which can provide significant insight into the exact nature of inflation. </p>

  <p markdown="1"> In an effort to address this question, we have adapted a code, [**PowerFull**](https://github.com/greglukens/PowerFull.jl), which efficiently computes the fully general relativistic angular galaxy power spectrum; this is a statistical tool that will be used to accurately constraining this primordial non-Gaussianity from observations of galaxies and large-scale structure. In particular, galaxy surveys, such as [**SPHEREx**](https://science.nasa.gov/mission/spherex/), will likely make statistically significant detections of this non-Gaussianity in the near future, so such a tool is especially relevant.
  </p>

  <details class="accordion">
    <summary><span>Click for more details</span></summary>
    <div class="content" markdown="1">

From observations of the cosmic microwave background (CMB), we know that these primordial fluctuations are *nearly* Gaussian, but even the smallest deviations from Gaussianity can have important implications. Therefore, the deviation from Gaussianity of the large-scale gravitational potential is typically expanded via
\\[\Phi(\boldsymbol x) = \Phi_G(\boldsymbol x) + f_{\mathrm{NL}} \left[\Phi_G^2(\boldsymbol x) - \left<\Phi_G \right>^2 \right] + \ldots \\]
Therefore, statistically significant measurements of this \\(f_{\mathrm{NL}}\\) term could act as a "smoking-gun" signal for inflation and help distinguish between different models of inflation.

Measurements of primordial non-Gaussianity have not reached statistical significance to date. The most accurate measurement from the CMB comes from the *Planck* satellite, which obtained \\( f_{\mathrm{NL}} = -0.9 \pm 5.1 \\) from the temperature statistics of the background. Clearly, there is room for improvement.

Moving away from the CMB, one can utilize observations of large-scale structure to constrain primordial non-Gaussianity. Typically, galaxies are used to trace the underlying matter distribution (we cannot see dark matter, unfortunately). These two fields are related via
\\[\delta_m(\boldsymbol x) = \frac{\rho_m(\boldsymbol x) - \bar \rho_m}{\bar \rho_m} \,,\qquad \quad \delta_g(\boldsymbol x) = \frac{n_g(\boldsymbol x) - \bar n_g}{\bar n_g}\,,  \qquad \quad \delta_g(\boldsymbol x,z) = b_1 \delta_m(\boldsymbol x,z) + \ldots \\]
where \\(b_1\\) is the linear galaxy bias and $z$ is redshift. As you will soon see, we can safely ignore nonlinearity in the bias expansion, as primordial non-Gaussanity manifests in the largest scales of galaxy clustering.

Specifically, primordial non-Gaussanity imposes a scale-dependent bias on galaxies which arises from the coupling of the large-scale gravitational potential $$\Phi$$ and the underlying density field $$\delta_m$$. Therefore, to linear order, we have
\\[\delta_g(\boldsymbol k, z) = \left\\{ b_1(z) + 3\left[ b_1(z) - 1 \right] f_\mathrm{NL} \frac{\Omega_{m,0} H_0^2 \delta_c}{k^2 T(k) D(z)} \right\\} \delta_m(\boldsymbol k, z)\,, \\]
where $$k$$ is the Fourier wavenumber (you can think of it as inversely proportional to separation or scale), $$T(k)$$ is the matter transfer function, $$\Omega_{m,0}$$ is the matter density parameter at present, $$D(z)$$ is the linear growth factor, $H_0$ is the Hubble paramter at present, and $$\delta_c \approx 1.686$$ is the critical density threshold for spherical collapse. The important takeaway here is that the signal from primordial non-Gaussianity scales as \\(k^{-2} \\), which means it will dominate at *large scales*. 

Due to this signal being prevalent at large scales (i.e., approaching a gigaparsec), new galaxy surveys have aimed to observe galaxies across unprecedented amounts of survey volume in hopes of constraining primordial non-Gaussianity to high precision. One such survey, [SPHEREx](https://science.nasa.gov/mission/spherex/), which just launched in early 2025, has a stated goal of $$\mathcal O(1)$$ precision on $$f_\mathrm{NL}$$. However, in order to achieve this, it will have to account for some significant observational challenges.

- **Problem 1**: A large survey volume is required to constrain $$f_\mathrm{NL}$$ to statistical significant levels.
  - *Solution*: SPHEREx will observe galaxies across the full sky and to redshifts deep enough to measure galaxy pair separations greater than 1 Gpc.
- **Problem 2**: On the full sky, proper treatment of redshift-space distortions is necessary.
  - *Solution*: Redshift-space distoritions (RSDs) arise from the degenerate combination of the redshift from the expansion of the universe (the one you want to measure) and the Doppler shift from the peculiar velocity of galaxies. The latter is directly coupled to the underlying matter field, so you cannot ignore it. Typically, it is modeled in Fourier space, which relies on the plane-wave basis ($$e^{i\boldsymbol k \cdot \boldsymbol x}$$) of the Fourier transform, which works when your survey covers a small fraction of the sky; you can reasonably approximate the line-of-sight direction to every galaxy as the same (i.e., the plane-parallel approximation). This basis and flat-sky assumption breaks down in the full sky regime; you must move to the spherical Fourier-Bessel (SFB) basis, which uses spherical Bessel functions, $$j_\ell(kr)$$, and spherical harmonics, $$Y_\ell(\hat {\boldsymbol n} )$$, to parameterize your survey volume.
- **Problem 3**: At large survey volumes and redshift, general relativistic effects must be taken into account.
  - *Solution*: Add the Doppler ($$\propto v_p$$), potential, integrated Sachs-Wolfe, Shapiro time-delay, and gravitational lensing terms to the traditional galaxy bias and redshift-space distortion terms present in the observed density contrast. While computationally expensive, this will allow you to forward model the effects present in the observations of galaxies across such a large survey volume.


With these in mind, we can write out the full general relativistic expression, where
{% raw %}
$$
\begin{aligned}
F_\ell(k,r)\; &=\;
\underbrace{b_1(r)\, j_\ell(kr)\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{real space}}
- \underbrace{f\, j''_\ell(kr)\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{RSD}}
+ \underbrace{aH\, \mathcal{B}\, \dfrac{j'_\ell(kr)}{k}\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{Doppler}}
+ \underbrace{a^2 H^2\, \mathcal{A}\, \dfrac{j_\ell(kr)}{k^2}\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{potential}}
+ \underbrace{\dfrac{\mathcal{B}}{f}\, \mathcal{I}_{\mathrm{ISW}}(k,r)\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{ISW}}
\\[4pt]
&\quad
- \underbrace{2(1-\mathcal{Q})\, \mathcal{I}_{\mathrm{TD}}(k,r)\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{time-delay}}
- \underbrace{2(1-\mathcal{Q})\, \mathcal{I}_\kappa(k,r)\vphantom{\dfrac{j_\ell(kr)}{k^2}}}_{\text{lensing}}
+ \underbrace{ 3 \left[b_1(r) - 1 \right] f_\text{NL} \frac{\Omega_{m,0}\,H_0^2 \delta_c}{D(r)}  \frac{j_\ell(kr)}{k^2 T(k)}}_{\text{primordial non-Gaussianity}}\,,
\end{aligned}
$$
{% endraw %}
is what we call the redshift-space kernel; you can think of it as the SFB version of the observed relativistic density contrast, $$\delta_g$$. Here, $$a$$ is the scale factor, $$H$$ is the Hubble parameter, $$f$$ is the linear growth rate, $$r$$ is the comoving distance, and $$'$$ denotes derivative by $$kr$$. Lastly, the relativistic coefficients $$\mathcal A$$ and $$\mathcal B$$ are given as
{% raw %}
$$
\begin{aligned}
  \mathcal A \,&= \,\frac{3}{2}\Omega_m \left[\frac{\mathcal B}{f}\left(1 - \frac{2f}{3\Omega_m} \right) + 2(1-\mathcal Q) \left(1+ \frac{2f}{3\Omega_m} \right) - \frac{4}{3}\frac{(1-\mathcal Q)}{aHr}\frac{f}{\Omega_m} \right]\,, \\[4pt]
  \mathcal B \,&= \,f(b_e + \mathcal C -1)\,, \\[4pt]
  \mathcal C \,&= -\frac{d\ln H}{d\ln a} - \frac{2}{aHr}(1-\mathcal Q) - 2\mathcal Q\,,
\end{aligned}
$$
{% endraw %}
where we now have defined the effective bias, $$b_e$$, and once again we see the magnification bias, $$\mathcal Q$$, which are both given via
\\[b_e = \frac{\mathrm{d} \ln (a^3 \bar n_g)}{\mathrm{d} \ln a}\,, \qquad \quad \mathcal Q = -\frac{\mathrm{d} \ln \bar n_g( > L_\text{min},z) }{\mathrm{d} \ln L_\text{min}}\,.\\]
Here, we see that $$L_\text{min}$$ is the limiting luminosity of a magnitude-limited survey. Lastly, we revisit the $$\mathcal I$$ expressions, which are given as
{% raw %}
$$
\begin{aligned}
  \mathcal{I}_\mathrm{ISW}(k,r) = &\, 3\int _0^r dr' \frac{a^3(r')H^3(r')\Omega_m(r')[f(r')-1]}{k^2} \frac{D(r')}{D(r)} j_{\ell}(kr')\,,
\\[4pt]
\label{eq:I_td}
    \mathcal{I}_\mathrm{TD}(k,r) = &\,3\int _0^r dr' \frac{a^2(r')H^2(r')\Omega_m(r')}{k^2} \frac{D(r')}{D(r)} j_{\ell}(kr')\,,
\\[4pt]
\label{eq:I_kappa} 
    \mathcal{I}_\mathrm{\kappa}(k,r) = &\, \frac{3}{2}\ell(\ell+1)\int _0^r dr'\frac{r-r'}{rr'} \frac{a^2(r')H^2(r')\Omega_m(r')}{k^2}\frac{D(r')}{D(r)} j_{\ell}(kr')\,.
\end{aligned}
$$
{% endraw %}

Finally, the full relativistic angular galaxy power spectrum, to linear order, is given as
\\[C_\ell(r,r') = D(r) D(r') \frac{2}{\pi} \int dk \, k^2 P(k) F_\ell(k,r) F_\ell(k,r')\,, \\]
where $$P(k) = \left<\delta_m(k) \delta_m(k')\right>$$ is the matter power spectrum. Therefore, taking into account all relativistic effects and primordial non-Gaussianity, each $$F_\ell$$ has 8 terms, so the angular power spectrum will have **64 terms**! Add in the fact that each term contains *two* spherical Bessel functions integrated over $$k$$, as well as some terms additionally integrated over $$r$$, and it becomes clear that the computational demands to model this full expression quickly build up.

In an effort to streamline this calculation, one of my projects has been to build upon the already-efficient [2-FAST](https://github.com/hsgg/TwoFAST.jl) (*2*-point function from *F*ast and *A*ccurate *S*pherical bessel *T*ransform), which swiftly computes integrals of the form
\\[w_{\ell,jj'}^p(r,r') = \frac{2}{\pi}\int dk\,k^{2+p} P(k) j_\ell^{(j)}(kr) j_\ell^{(j')}(kr')\,, \\]
for $$(j,j') = (0,0),\,(0,2),\,(2,0),\,(2,2)$$. However, the full relativistic expression requires $$j,j' = 1$$ and integration of $$w_{\ell,jj'}$$ over the line-of-sight. Therefore, we have created [**PowerFull**](https://github.com/greglukens/PowerFull.jl), which is the full relativistic extension/add-on of the 2-FAST algorithm.


  </div>
  </details>

  <!-- leave a blank line above this figure -->
  <figure class="fig shadow-soft lightbox">
    <img src="{{ '/assets/img/cl_ell2_grid.png' | relative_url }}" alt="cl_mosaic" data-caption="Cl_ell2">
    <figcaption><em>Each component of the full relativistic angular power spectrum at the quadrupole moment. Here, "Velocity" represents the Doppler term that arises in the Newtonian and relativistic treatments, and "PNG" stands for primordial non-Gaussianity.</em></figcaption>
  </figure>

  <p>We applied this new algorithm to make a forecast for SPHEREx; this paper will be published very soon (look for
  <strong>Lukens &amp; Jeong, 2025/2026</strong>).</p>
</div>

<div class="research-block">
  <h3 class="project-title">Higher-order relativistic galaxy clustering</h3>
  <p class="project-tagline" markdown="1"> 
  </p>
</div>





