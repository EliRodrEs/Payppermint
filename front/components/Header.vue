<template>
    <navbar class="sticky top-0 text-center bg-[var(--zexel-success)] text-[var(--zexel-pure-white)] h-[4rem] p-4 flex justify-between items-center">
        <router-link to="/" class="block">
            <div class="max-w-[2rem] flex items-end gap-2 cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-110">
                <img src="../public/img/mint_white.svg" alt="mint_logo">
                <h1 class="font-bold text-[var(--zexel-pure-white)] text-xl">PAYPPERMINT</h1>
            </div>
        </router-link>
        <div class="menu text-[var(--zexel-pure-white)] flex gap-4">
            <NuxtLink to="/payments" class="transform transition-transform duration-500 ease-in-out hover:scale-110">
                <div class="h5 m-0">{{ $t('payments') }}</div>
            </NuxtLink>
            <NuxtLink to="/countries" class="transform transition-transform duration-500 ease-in-out hover:scale-110">
                <div class="h5 m-0">{{ $t('countries') }}</div>
            </NuxtLink>
        </div>
    </navbar>
  </template>
  