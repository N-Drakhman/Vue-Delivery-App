<template>
  <div class="hero">
    <div class="container">
      <img src="../assets/img/hero-img.png" alt="hero-img" />

      <div class="text-block">
        <div class="slogan">
          <h1>Unparalleled flavors</h1>
          <span>Feel the care taken in preparing the selected ingredients</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  width: 100%;
  padding: 210px 0 0;
  position: relative;
  margin-bottom: 62px;

  & img {
    height: 130%;
    margin-top: -68px;
    margin-left: -56px;
  }

  .container {
    background: linear-gradient(180deg, #091e26 0%, #00131c 100%);
    width: 100%;
    height: 260px;
    color: #e1e1e6;
    display: flex;
    justify-content: space-between;

    & .text-block {
      width: 554px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & .slogan {
        margin-right: 24px;
        & h1 {
          font-size: 40px;
          font-weight: 600;
          line-height: 56px;
          margin-bottom: 8px;
        }

        & span {
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .hero {
    & img {
      height: 110%;
      margin-top: -16px;
    }

    & .container {
      & .text-block {
        & .slogan {
          & h1 {
            font-size: 32px;
          }

          & span {
            font-size: 16px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .hero {
    padding: 82px 0 0;

    & img {
      height: 90%;
      margin-top: 30px;
      margin-left: -83px;
    }

    & .container {
      height: 240px;

      & .text-block {
        & .slogan {
          & h1 {
            font-size: 32px;
            line-height: 1;
          }

          & span {
            font-size: 16px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 62px 0 0;

    & img {
              height: 85%;
        margin-top: 36px;
        margin-left: -82px;
    }

    & .container {
      height: 200px;

      & .text-block {
        & .slogan {
          & h1 {
            font-size: 25px;
            line-height: 1;
          }

          & span {
            font-size: 14px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 648px) {
  .hero {
    & img {
      height: 80%;
      margin-top: 32px;
      margin-left: -42px;
    }

    & .container {
      height: 140px;

      & .text-block {
        & .slogan {
          padding: 36px 0 34px 0;
          margin-left: 15px;
          & h1 {
            font-size: 18px;
            line-height: 22px;
          }

          & span {
            font-size: 12px;
          }
        }
      }
    }
  }
}


</style>
