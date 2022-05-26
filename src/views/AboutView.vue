<template>
  <div class="about">
    <el-row class="row-bg">
      <el-col :span="12" :offset="6">
        <div class="item">
          <el-avatar :size="200" src="/rollcall/static/1.jpg"> </el-avatar>
        </div>
        <div class="item fonda">
          <span>王滕辉</span>
          <a href="https://github.com/514840279" class="afro" target="_blank"
            ><el-avatar
              :size="30"
              src="/rollcall/static/logo/a23b4cf17327527ae66aad5d13f059da.png"
            >
            </el-avatar
          ></a>
          <a href="https://www.jianshu.com/u/cf31b9838b17" class="afro" target="_blank"
            ><el-avatar
              :size="30"
              src="/rollcall/static/logo/a0137cb8b628250f276e6b8b192f2014.png"
            >
            </el-avatar
          ></a>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-bg">
      <el-col :span="12" :offset="6">
        <table class="va-table" style="width: 100%; height: 100%">
          <!-- <thead>
            <tr>
              <th class="fondu">技术</th>
              <th>熟练度</th>
              <th class="fondu">技术</th>
              <th>熟练度</th>
            </tr>
          </thead> -->
          <tbody>
            <tr v-for="(skill, ind) in skills" :key="ind">
              <td class="fondu">{{ skill.name1 + "：" }}</td>
              <td>
                <el-rate
                  v-model="skill.level1"
                  size="large"
                  :halves="true"
                  readonly="true"
                />
              </td>
              <td class="fondu">{{ skill.name2 + "：" }}</td>
              <td>
                <el-rate
                  v-model="skill.level2"
                  size="large"
                  :halves="true"
                  readonly="true"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skills: [
        { name1: "java", level1: 4.5, name2: "spring boot", level2: 4 },
        { name1: "python", level1: 3, name2: "spring cloud", level2: 4 },
        { name1: "vue", level1: 3, name2: "mysql", level2: 4 },
        { name1: "oracle", level1: 4, name2: "docker", level2: 4 },
        { name1: "maven", level1: 4, name2: "git", level2: 3 },
        { name1: "linux", level1: 3, name2: "windows", level2: 4 },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.about {
  margin-top: 22px;
}
.item {
  border: 0px solid rgb(212, 205, 205);
  background-color: #ffffff;
  text-align: center;
}
.fonda {
  font-size: 28px;
  font-weight: 500;
}
.fondu {
  text-align: right;
}

.afro {
  margin-left: 15px;
}
</style>
